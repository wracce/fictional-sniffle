from flask import Flask, request, send_file
from flask_restx import Api, Resource, reqparse
from werkzeug.datastructures import FileStorage
import torch
import io
from PIL import Image
import numpy as np
import torchvision.transforms.functional as TF
from model import build_model
from main_model import MainModel, build_res_unet, lab_to_rgb


# Инициализация Flask-приложения
app = Flask(__name__)

# Создание API с префиксом и включённым Swagger UI по стандартному пути / (http://localhost:5000/)
api = Api(
    app,
    title="Colorization API",
    description="Колоризация изображений с помощью нейросети",
    prefix="/api/colorization/v1",  # Все ручки будут с этим префиксом
    doc="/api/colorization/v1"
)

# Парсер для загрузки изображений
upload_parser = reqparse.RequestParser()
upload_parser.add_argument('file', location='files', type=FileStorage, required=True)

# Инициализация модели
model = build_model()

def preprocess_image(file):
    """Загружает изображение, сохраняет оригинальный размер и возвращает нормализованный L-канал"""
    image = Image.open(file).convert("L")
    orig_size = image.size  # (width, height)
    resized = image.resize((256, 256))

    arr = np.array(resized).astype(np.float32) / 255.0
    arr = (arr - 0.5) * 2  # [-1, 1]
    tensor = torch.tensor(arr).unsqueeze(0).unsqueeze(0)  # (1, 1, 256, 256)
    return tensor, image, orig_size

# Эндпоинт POST /api/colorization/v1/colorize
@api.route('/colorize')
class Colorize(Resource):
    @api.expect(upload_parser)
    @api.response(200, 'Success')
    @api.produces(['image/png'])
    def post(self):
        """Колоризировать чёрно-белое изображение"""
        args = upload_parser.parse_args()
        file = args['file']

        try:
            input_tensor, original_L, orig_size = preprocess_image(file)

            with torch.no_grad():
                ab = model.net_G(input_tensor).cpu()
                ab_resized = TF.resize(ab, orig_size[::-1])  # (H, W)

                L_np = np.array(original_L).astype(np.float32) / 255.0
                L_np = (L_np - 0.5) * 2
                L_tensor = torch.tensor(L_np).unsqueeze(0).unsqueeze(0)

                rgb = lab_to_rgb(L_tensor, ab_resized)

            out_img = Image.fromarray((rgb[0] * 255).astype(np.uint8))
            img_io = io.BytesIO()
            out_img.save(img_io, format='PNG')
            img_io.seek(0)
            return send_file(img_io, mimetype='image/png')

        except Exception as e:
            return {"error": str(e)}, 500

# Запуск сервера
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

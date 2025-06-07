import torch
from main_model import MainModel, build_res_unet, lab_to_rgb  # из твоего кода
import numpy as np

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def build_model():
    net_G = build_res_unet(n_input=1, n_output=2, size=256)
    net_G.load_state_dict(torch.load("preout.pt", map_location=device))
    model = MainModel(net_G=net_G)
    model.load_state_dict(torch.load("out.pt", map_location=device))
    model.eval()
    return model

def inference(L: torch.Tensor, ab: torch.Tensor) -> np.ndarray:
    rgb = lab_to_rgb(L, ab)
    return rgb

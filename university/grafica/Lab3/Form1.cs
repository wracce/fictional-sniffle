using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace Lab3
{
    public partial class Form1 : Form
    {
        // Иницилизация
        Bitmap bitmap = new Bitmap(720, 480);
        Color color;
        int radius;
        uint state = 0;
        int[] tmp = new int[2];
        Queue<int[]> queueB;
        public Form1()
        {
            InitializeComponent();
            bitmapClear();

            pictureBox1.Image = bitmap;
            pictureBox1.Refresh();

        }

        // Обработка нажатие кликом на холст
        private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
        {
            radius = int.Parse(textBox1.Text);
            color = colorDialog1.Color;

            // Отрисовка круга
            if (state == 1)
            {
                DrawCircle(e.X, e.Y, radius, colorDialog1.Color);
            }

            // Отрисовка линии
            if (state == 2)
            {
                tmp[0] = e.X;
                tmp[1] = e.Y;
                state = 3;
            }
            else if (state == 3)
            {
                DrawLine(tmp[0], tmp[1], e.X, e.Y, colorDialog1.Color);
                state = 2;
            }

            // Заливк цветом
            if (state == 4)
            {
                FillObj1(e.X, e.Y, colorDialog1.Color);
            }

            // Заливка Патерном
            if (state == 5)
            {
                Color[,] pattern = new Color[3, 3];
                pattern[0, 0] = Color.Red;
                pattern[0, 1] = Color.Blue;
                pattern[0, 2] = Color.Red;
                pattern[1, 0] = Color.Blue;
                pattern[1, 1] = Color.Red;
                pattern[1, 2] = Color.Blue;
                pattern[2, 0] = Color.Red;
                pattern[2, 1] = Color.Blue;
                pattern[2, 2] = Color.Red;

                FillPattern(e.X, e.Y, pattern);
            }

            // Отрисовка ломанной линии
            if (state == 6)
            {
                tmp[0] = e.X;
                tmp[1] = e.Y;
                state = 7;
            }
            else if (state == 7)
            {
                DrawLine(tmp[0], tmp[1], e.X, e.Y, colorDialog1.Color);
                tmp[0] = e.X;
                tmp[1] = e.Y;
            }

            // Отрисовка линии Безье
            if (state == 8)
            {
                state = 9;
                tmp[0] = e.X;
                tmp[1] = e.Y;
                queueB.Enqueue(new int[] { e.X, e.Y });
            } else if (state == 9)
            {
                if (checkBox1.Checked == true)
                    DrawLine(tmp[0], tmp[1], e.X, e.Y, colorDialog1.Color);
                tmp[0] = e.X;
                tmp[1] = e.Y;
                queueB.Enqueue(new int[] { e.X, e.Y });

            }

            pictureBox1.Refresh();
        }


        #region Кнопки панели меню

        // Пункт меню "Выход"
        private void выходToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            DialogResult result = MessageBox.Show(
                "Вы действительно хотите выйти?",
                "Окно выхода",
                MessageBoxButtons.YesNo,
                MessageBoxIcon.Question,
                MessageBoxDefaultButton.Button1
            );
            if (result == DialogResult.Yes) Application.Exit();

        }

        // Пункт меню "О программе"
        private void оПрограммеToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Лабораторная работа №3\n\n" + 
                            "Надеждин Виталий\n" +
                            "группа: 6202\n",
                            "О программе");
        }
        #endregion

        #region Функции отрисовки
        // Отрисовка точки
        private void DrawPoint(int x, int y, Color color)
        {
            if (x>=0 && y>=0 && x<bitmap.Width && y<bitmap.Height)
                bitmap.SetPixel(x, y, color);
        }

        // Отрисовка линии
        private void DrawLine(int x0, int y0, int x1, int y1, Color color)
        {
            double x, y, dx, dy, m, e;
            x = x0;
            y = y0;
            dx = Math.Abs(x1 - x0);
            dy = Math.Abs(y1 - y0);

            DrawPoint((int)x, (int)y, color);

            if (dy <= dx)
            {
                m = dy / dx;
                e = m - 0.5;
                for (int i = 0; i < dx; i++)
                {
                    e = e + m;
                    if (e >= 0)
                    {
                        if (y1 >= y0)
                            y++;
                        else
                            y--;
                        e--;
                    }
                    if (x1 >= x0)
                        x++;
                    else
                        x--;
                    DrawPoint((int)x, (int)y, color);
                }
            }
            else
            {
                m = dx / dy;
                e = m - 0.5;
                for (int i = 0; i < dy; i++)
                {
                    e = e + m;
                    if (e >= 0)
                    {
                        if (x1 >= x0)
                            x++;
                        else
                            x--;
                        e--;
                    }
                    if (y1 >= y0)
                        y++;
                    else
                        y--;
                    DrawPoint((int)x, (int)y, color);
                }
            }
        }

        // Отрисовка окружности
        private void DrawCircle(int x0, int y0, int radius, Color color)
        {
            int x, y, d;
            x = 0;
            y = radius;
            d = 3 - 2 * radius;
            while (y >= x)
            {

                DrawPoint(x + x0, y + y0, color);
                DrawPoint(-x + x0, y + y0, color);
                DrawPoint(x + x0, -y + y0, color);
                DrawPoint(-x + x0, -y + y0, color);
                DrawPoint(y + x0, x + y0, color);
                DrawPoint(y + x0, -x + y0, color);
                DrawPoint(-y + x0, x + y0, color);
                DrawPoint(-y + x0, -x + y0, color);

                if (d <= 0)
                    d = d + 4 * x + 6;
                else
                {
                    d = d + 4 * (x - y) + 10;
                    y--;
                }
                x = x + 1;

            }
        }

        // Заливка объекта цветом
        private void FillObj1(int x0, int y0, Color color)
        {
            Color color0 = bitmap.GetPixel(x0, y0);
            int[] tmp = { x0, y0 };
            Stack<int[]> stack = new Stack<int[]>();

            stack.Push(tmp);
            int i = 1;
            while (stack.Count() != 0)
            {
                i++;
                tmp = stack.Pop();
                if (bitmap.GetPixel(tmp[0], tmp[1]) == color0)
                {
                    DrawPoint(tmp[0], tmp[1], color);

                    if (tmp[0] + 1 < 720 && bitmap.GetPixel(tmp[0] + 1, tmp[1]) == color0)
                        stack.Push(new int[] { tmp[0] + 1, tmp[1] });
                    if (tmp[1] + 1 < 480 && bitmap.GetPixel(tmp[0], tmp[1] + 1) == color0)
                        stack.Push(new int[] { tmp[0], tmp[1] + 1 });
                    if (tmp[0] - 1 >= 0 && bitmap.GetPixel(tmp[0] - 1, tmp[1]) == color0)
                        stack.Push(new int[] { tmp[0] - 1, tmp[1] });
                    if (tmp[1] - 1 >= 0 && bitmap.GetPixel(tmp[0], tmp[1] - 1) == color0)
                        stack.Push(new int[] { tmp[0], tmp[1] - 1 });
                }
            }
        }

        // Заливка объекта паттерном
        private void FillPattern(int x0, int y0, Color[,] pattern)
        {

            Color color0 = bitmap.GetPixel(x0, y0);
            int[] tmp = { x0, y0 };
            Stack<int[]> stack = new Stack<int[]>();

            stack.Push(tmp);
            int i = 1;
            while (stack.Count() > 0)
            {
                i++;
                tmp = stack.Pop();
                if (bitmap.GetPixel(tmp[0], tmp[1]) == color0)
                {
                    DrawPoint(tmp[0], tmp[1], pattern[tmp[0] % 2, tmp[1] % pattern.GetLength(0)]);

                    if (tmp[0] + 1 < 720 && bitmap.GetPixel(tmp[0] + 1, tmp[1]) == color0)
                        stack.Push(new int[] { tmp[0] + 1, tmp[1] });
                    if (tmp[1] + 1 < 480 && bitmap.GetPixel(tmp[0], tmp[1] + 1) == color0)
                        stack.Push(new int[] { tmp[0], tmp[1] + 1 });
                    if (tmp[0] - 1 >= 0 && bitmap.GetPixel(tmp[0] - 1, tmp[1]) == color0)
                        stack.Push(new int[] { tmp[0] - 1, tmp[1] });
                    if (tmp[1] - 1 >= 0 && bitmap.GetPixel(tmp[0], tmp[1] - 1) == color0)
                        stack.Push(new int[] { tmp[0], tmp[1] - 1 });
                }
            }
        }

        // Заливка холста белым цветом
        private void bitmapClear()
        {
            for (int i = 0; i < bitmap.Width; i++)
            {
                for (int j = 0; j < bitmap.Height; j++)
                    DrawPoint(i, j, Color.White);
            }
        }

        // Отрисовка линий безье
        private void DrawBezie(int[,] arr, double t, Color color)
        {
            int m = arr.GetLength(0)-1;
            Queue<int[]> queue = new Queue<int[]>();

            for (double j = 0; j<= 1; j = j+t)
            {
                double x = 0;
                double y = 0;
                for (int i=0; i<=m; i++)
                {
                    x = (x + (Factorial(m) / (Factorial(i) * Factorial(m - i)))*Math.Pow(j,i)*Math.Pow(1-j, m-i)*arr[i,0]);
                    y = (y + (Factorial(m) / (Factorial(i) * Factorial(m - i))) * Math.Pow(j, i) * Math.Pow(1 - j, m - i) * arr[i, 1]);
                }
                queue.Enqueue(new int[] { (int)Math.Round(x), (int)Math.Round(y) });
            }

            while (queue.Count() >= 2)
            {
                int[] tmp1 = queue.Dequeue();
                int[] tmp2 = queue.Peek();
                DrawLine(tmp1[0], tmp1[1], tmp2[0], tmp2[1], colorDialog1.Color);
            }
        }
        #endregion

        #region Кнопки панели Инструментов
        // Кнопка - Выбор цвета
        private void buttonColor_Click(object sender, EventArgs e)
        {
            {
                if (colorDialog1.ShowDialog() == DialogResult.OK)

                    color = colorDialog1.Color;
            }
        }

        // Кнопка "Круг"
        private void buttonCircle_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            state = 1;

        }

        //Кнопка "Линия"
        private void buttonLine_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            state = 2;
        }

        // Кнопка "Ломанная линия"
        private void button3_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            state = 6;
        }
        
        // Кнопка "Заливка цветом"
        private void button1_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            state = 4;
        }

        // Кнопка "Заливка Паттерном"
        private void button2_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            state = 5;

        }

        // Кнопка "Очистка холста"
        private void buttonClear_Click(object sender, EventArgs e)
        {
            bitmapClear();
            pictureBox1.Refresh();
        }

        // Кнопка "Безье" 
        private void button4_Click(object sender, EventArgs e)
        {
            pictureBox1.Cursor = Cursors.Arrow;
            queueB = new Queue<int[]>();
            state = 8;
        }

        // Кнопка "Построить" 
        private void button5_Click(object sender, EventArgs e)
        {
            int[][] arr1 = queueB.ToArray();
            int[,] arr2 = new int[queueB.Count(), 2];

            for (int i = 0; i < arr1.Length; i++)
                for (int j = 0; j < arr1[i].Length; j++)
                    arr2[i, j] = arr1[i][j];

            DrawBezie(arr2, double.Parse(textBox2.Text.Replace(".", ",")), colorDialog1.Color);
            pictureBox1.Refresh();
        }
        #endregion

        #region Другие функции
        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            pictureBox1.Refresh();
        }

        private int Factorial(int numb)
        {
            int res = 1;
            for (int i = numb; i > 1; i--)
                res *= i;
            return res;
        }
        #endregion

    }
}

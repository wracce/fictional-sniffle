using System;
using System.Drawing;
using System.Windows.Forms;
using System.Windows.Media.Media3D;

namespace Lab5
{
    public partial class Form1 : Form
    {
        int p = 20;
        int m = 12;
        int grad;
        int R;
        double a, b;

        Camera cam;
        Kinder kinder;

        Point3D[,] parallels;
        Point3D[,] meredians;

        public Form1()
        {
            InitializeComponent();

            grad = int.Parse(textBox1.Text);
            R = int.Parse(textBox3.Text);
            a = (double)trackBar1.Value;
            b = (double)trackBar2.Value;

            cam = new Camera(600, grad, pictureBox1.Width, pictureBox1.Height);
            kinder = new Kinder(R, m, p);
            kinder.Rotate(a, b);
            parallels = kinder.Parallels;
            meredians = kinder.Meredians;

            DrawFunc();
        }

        // вычисление ффунцции при разных параментрах
        private Point3D function(double a, double b, double R)
        {
            double x, y, z;
            double sin_a = Math.Sin(a);
            double cos_a = Math.Cos(a);
            x = R * sin_a * Math.Cos(b);
            y = R * sin_a * Math.Sin(b);
            if (cos_a > 0)
            {
                z = R - 0.5 * R * cos_a;
            }
            else
            {
                z = R * cos_a;
            }
            return new Point3D(x, y, z);
        }

        private void DrawFunc()
        {
            // рисуем линии
            pictureBox1.Image = (Image)new Bitmap(pictureBox1.Width, pictureBox1.Height);
            Graphics g = Graphics.FromImage(pictureBox1.Image);
            Pen pen = new Pen(Color.Red);
            Point p0, p1;
            int dx, dy;
            dx = pictureBox1.Width / 2;
            dy = pictureBox1.Height / 2;

            for (int i = 0; i < p; i++)
                for (int j = 0; j < m - 1; j++)
                {
                    p0 = cam.getProection(parallels[i, j]);
                    p1 = cam.getProection(parallels[i, j + 1]);
                    g.DrawLine(pen, p0.X + dx, p0.Y + dy, p1.X + dx, p1.Y + dy);
                }

            for (int i = 0; i < m; i++)
                for (int j = 0; j < p - 1; j++)
                {
                    p0 = cam.getProection(meredians[i, j]);
                    p1 = cam.getProection(meredians[i, j + 1]);
                    g.DrawLine(pen, p0.X + dx, p0.Y + dy, p1.X + dx, p1.Y + dy);
                }


            g.Dispose();
            pictureBox1.Refresh();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            if (textBox1.Text.Length != 0)
            {
                grad = int.Parse(textBox1.Text);
                cam.Grad = grad;
                DrawFunc();
            }
        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {
            if (textBox3.Text.Length != 0)
            {
                R = int.Parse(textBox3.Text);
                kinder.R = R;
                DrawFunc();
            }
        }

        private void trackBar2_Scroll(object sender, EventArgs e)
        {
            b = trackBar2.Value * Math.PI / 90;
            kinder.Rotate(0, b-kinder.Beta);
            DrawFunc();
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            a = trackBar1.Value * Math.PI / 90;
            kinder.Rotate(a-kinder.Alpha,0);
            DrawFunc();
        }
    }
}

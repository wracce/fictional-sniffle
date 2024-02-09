using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static lab4.Matr;
using static lab4.Bmp;

namespace lab4
{
    public partial class Form1 : Form
    {
        Bmp bmp;
        Bitmap bitmapBase;
        Bitmap bitmapGray;
        Bitmap bitmapPreparation;
        Bitmap bitmapMask;

        public Form1()
        {
            InitializeComponent();
            button1.Enabled = false;
        }

        private void открытьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Изображения (*.BMP;*.JPG;*.GIF;*.PNG)|*.BMP;*.JPG;*.GIF;*.PNG|All files (*.*)|*.*";
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                // Расчитаем коэф сжатия
                Image Img = Image.FromFile(openFileDialog1.FileName);
                float ratioX = (float)pictureBox1.Width / Img.Width;
                float ratioY = (float)pictureBox1.Height / Img.Height;
                float ratio = Math.Max(ratioX, ratioY);
                int newWidth = (int)(Img.Width * ratio);
                int newHeight = (int)(Img.Height * ratio);

                bitmapBase = new Bitmap(Img, newWidth, newHeight);
                bmp = new Bmp(bitmapBase);
                pictureBox1.Image = bitmapBase;
                pictureBox1.Refresh();

                bitmapGray = bmp.BitmapTransformToGray();
                pictureBox2.Image = bitmapGray;
                pictureBox2.Refresh();

                bmp.Bitmap = bitmapGray;
                bitmapPreparation = bmp.BitmapPreparation(trackBar1.Value);
                pictureBox3.Image = bitmapPreparation;
                pictureBox3.Refresh();


                bmp.Bitmap = bitmapGray;
                double[,] M = new double[3,3] { { 1, 1, 1 }, 
                                                { 1, 2, 1 }, 
                                                { 1, 1, 1 } };
                bitmapMask = bmp.BitmapSetMask(0, 0.1, M);
                pictureBox4.Image = bitmapMask;
                pictureBox4.Refresh();


                button1.Enabled = true;
            }
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
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

        private void оПрограммеToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Лабораторная работа №4\n\n" +
                "Надеждин Виталий\n" +
                "группа: 6202\n",
                "О программе");
        }

        private void trackBar1_Scroll(object sender, EventArgs e)
        {
            label2.Text = trackBar1.Value.ToString();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            bitmapPreparation = bmp.BitmapPreparation(trackBar1.Value);
            pictureBox3.Image = bitmapPreparation;
            pictureBox3.Refresh();
        }
    }
}

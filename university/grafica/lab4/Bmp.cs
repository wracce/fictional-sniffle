using System;
using System.Drawing;

namespace lab4
{
    class Bmp
    {
        // Поля
        private Bitmap bitmap;
        private Bitmap bitmapTmp;

        // Конструкторы
        public Bmp(string _fileName)
        {
            new Bitmap(_fileName);
        }

        public Bmp(Bitmap _bitmap)
        {
            bitmap = _bitmap;
        }

        //Свойства
        public Bitmap Bitmap
        {
            get { return bitmap; }
            set { bitmap = value; }
        }

        // Функции
        public Bitmap BitmapTransformToGray()
        {
            bitmapTmp = new Bitmap(bitmap.Width, bitmap.Height);
            Color clr;
            int value;

            for (int i = 0; i < bitmap.Height; i++)
                for (int j = 0; j < bitmap.Width; j++)
                {
                    clr = bitmap.GetPixel(j, i);
                    value = (int)Math.Round(0.3 * clr.R + 0.59 * clr.G + 0.11 * clr.B);

                    bitmapTmp.SetPixel(j, i, Color.FromArgb(value, value, value));
                }

            return bitmapTmp;
        }

        public Bitmap BitmapPreparation(int porog)
        {
            bitmapTmp = new Bitmap(bitmap.Width, bitmap.Height);
            int clr;

            for (int i = 0; i < bitmap.Height; i++)
                for (int j = 0; j < bitmap.Width; j++)
                {
                    clr = bitmap.GetPixel(j, i).R;
                    if (clr >= porog)
                        clr = 255;
                    bitmapTmp.SetPixel(j, i, Color.FromArgb(clr, clr, clr));
                }

            return bitmapTmp;
        }

        public Bitmap BitmapSetMask(double a, double b, double[,] m)
        {
            Bitmap bitmapOut = new Bitmap(bitmap.Width, bitmap.Height);
            Bitmap bitmapNew  = new Bitmap((Image)bitmap, bitmap.Width+2, bitmap.Height+2);
            for (int i = 1; i < bitmap.Height - 1; i++)
                for (int j = 1; j < bitmap.Width - 1; j++)
                {
                    if (!(i == 0 | j == 0 | j == bitmap.Width - 1 | i == bitmap.Height - 1))
                    {
                        bitmapNew.SetPixel(j, i, bitmap.GetPixel(j - 1, i - 1));
                    }
                }
                    
            double clrR, clrG, clrB;


            for (int i = 1; i < bitmapNew.Height - 1; i++)
                for (int j = 1; j < bitmapNew.Width - 1; j++)
                {
                    {
                        clrR = 0;
                        clrG = 0;
                        clrB = 0;

                        double[,] R = new double[,] { { bitmapNew.GetPixel(j-1, i-1).R, bitmapNew.GetPixel(j, i-1).R, bitmapNew.GetPixel(j+1, i-1).R },
                                            { bitmapNew.GetPixel(j-1, i).R, bitmapNew.GetPixel(j, i).R, bitmapNew.GetPixel(j + 1, i).R},
                                            { bitmapNew.GetPixel(j-1, i+1).R, bitmapNew.GetPixel(j, i+1).R, bitmapNew.GetPixel(j+1, i+1).R } };
                        double[,] G = new double[,] { { bitmapNew.GetPixel(j-1, i-1).G, bitmapNew.GetPixel(j, i-1).G, bitmapNew.GetPixel(j+1, i-1).G },
                                            { bitmapNew.GetPixel(j-1, i).G, bitmapNew.GetPixel(j, i).G, bitmapNew.GetPixel(j + 1, i).G},
                                            { bitmapNew.GetPixel(j-1, i+1).G, bitmapNew.GetPixel(j, i+1).G, bitmapNew.GetPixel(j+1, i+1).G } };
                        double[,] B = new double[,] { { bitmapNew.GetPixel(j-1, i-1).B, bitmapNew.GetPixel(j, i-1).B, bitmapNew.GetPixel(j+1, i-1).B },
                                            { bitmapNew.GetPixel(j-1, i).B, bitmapNew.GetPixel(j, i).B, bitmapNew.GetPixel(j + 1, i).B},
                                            { bitmapNew.GetPixel(j-1, i+1).B, bitmapNew.GetPixel(j, i+1).B, bitmapNew.GetPixel(j+1, i+1).B } };

                        for (int y = 0; y < 3; y++)
                            for (int x = 0; x < 3; x++)
                                clrR += R[y, x] * m[y, x];
                        for (int y = 0; y < 3; y++)
                            for (int x = 0; x < 3; x++)
                                clrG += G[y, x] * m[y, x];
                        for (int y = 0; y < 3; y++)
                            for (int x = 0; x < 3; x++)
                                clrB += B[y, x] * m[y, x];

                        clrR = Math.Round(clrR * b + a);
                        clrG = Math.Round(clrG * b + a);
                        clrB = Math.Round(clrB * b + a);

                        if (clrR > 255)
                            clrR = 255;
                        if (clrR < 0)
                            clrR = 0;

                        if (clrG > 255)
                            clrG = 255;
                        if (clrG < 0)
                            clrG = 0;

                        if (clrB > 255)
                            clrB = 255;
                        if (clrB < 0)
                            clrB = 0;
                        bitmapOut.SetPixel(j-1, i-1, Color.FromArgb((int)clrR, (int)clrR, (int)clrR));
                    }
                }

            return bitmapOut;
        }

        public Bitmap zhongSuen()
        {
            bitmapTmp = new Bitmap(bitmap);
            int deletedCount;
            bool isDeleted;
            int k = 0;
            do
            {
                isDeleted = false;
                deletedCount = 0;
                //Console.WriteLine("1");
                for (int y = 1; y < bitmap.Height-1; y++)
                    for (int x = 1; x < bitmap.Width-1; x++)
                    {
                        int B = 0;
                        int A = 0;
                        int[] P = new int[9]
                        {
                            isWhitePixel(x, y, bitmapTmp),
                            isWhitePixel(x, y-1, bitmapTmp),
                            isWhitePixel(x+1, y-1, bitmapTmp),
                            isWhitePixel(x + 1, y, bitmapTmp),
                            isWhitePixel(x+1, y+1, bitmapTmp),
                            isWhitePixel(x, y+1, bitmapTmp),
                            isWhitePixel(x-1, y+1, bitmapTmp),
                            isWhitePixel(x-1, y, bitmapTmp),
                            isWhitePixel(x-1, y-1, bitmapTmp)
                        };

                        for (int i=1; i < 9; i++)
                        {
                                B += P[i];
                        }
                        isDeleted |= (B >= 2 && B<=6) ;

                        for (int i = 1; i < 9; i++)
                        {
                            if (i != 8 && P[i] == 0 && P[i + 1] == 1)
                                A++;
                            else if (P[8] == 0 && P[1] == 1)
                                A++;
                        }
                        isDeleted &= (A == 1);

                        isDeleted &= ((P[1] * P[3] * P[5] == 0 && P[3] * P[5] * P[7] == 0) || (P[1] * P[3] * P[7] == 0 && P[1] * P[5] * P[7] == 0));



                        if (isDeleted)
                        {
                            bitmapTmp.SetPixel(x, y, Color.White);
                            deletedCount++;
                            //Console.WriteLine("fdgfh");
                        }

                        // second etap
                        if (deletedCount > 0 && (isDeleted == false))
                            isDeleted = true;
                        k++;
                    }
            } while (k<20);
            return bitmapTmp;
        }

        private int isWhitePixel(int x, int y, Bitmap btm)
        {
            int result = 1;
            if (btm.GetPixel(x, y) == Color.FromArgb(0,0,0))
            {
                //Console.WriteLine("White");
                result = 0;
            }
            return result;
        }
    }
}

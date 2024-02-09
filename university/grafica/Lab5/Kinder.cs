using System;
using System.Windows.Media.Media3D;

namespace Lab5
{
    class Kinder
    {
        private double r, alpha, beta;
        private int m, p;
        private Point3D[,] parallels;
        private Point3D[,] meredians;


        public Kinder(double _R, int _m, int _p)
        {
            r = _R;
            m = _m;
            p = _p;
            alpha = 0;
            beta = 0;
            parallels = new Point3D[p, m];
            meredians = new Point3D[m, p];
            FindXYZ();
        }

        public double R
        {
            set { 
                r = value;
                FindXYZ();
                Rotate(alpha, beta);
            }
        }

        public Point3D[,] Parallels
        {
            get { return parallels; }
        }

        public Point3D[,] Meredians
        {
            get { return meredians; }
        }

        public Point3D Func(double a, double b)
        {
            double x, y, z;
            x = r * Math.Sin(a) * Math.Cos(b);
            y = r * Math.Sin(a) * Math.Sin(b);
            z = r * Math.Cos(a);
            if (z > 0)
                z = 0.5*z+r;
            return new Point3D(x, y, z);
        }

        public double Alpha
        {
            get { return alpha; }
        }

        public double Beta
        {
            get { return beta; }
        }
        public void Rotate(double _a, double _b)
        {
            for (int j = 0; j < p; j++)
                for (int i = 0; i < m; i++)
                {
                    double x, y, z, x1, y1, z1;
                    x = parallels[j, i].X;
                    y = parallels[j, i].Y;
                    z = parallels[j, i].Z;
                    x1 = x * Math.Cos(_a) - y * Math.Sin(_a);
                    y1 = x * Math.Sin(_a) *Math.Cos(_b) + y* Math.Cos(_a) * Math.Cos(_b) - z * Math.Sin(_b);
                    z1 = x * Math.Sin(_a) * Math.Sin(_b) + y * Math.Cos(_a) * Math.Sin(_b) + z * Math.Cos(_b);
                    parallels[j, i] = new Point3D(x1, y1, z1);
                    meredians[i, j] = parallels[j, i];
                }
            alpha += _a;
            beta += _b;
        }

        private void FindXYZ()
        {
            double a, b;
            for (int j = 0; j < p; j++)
                for (int i = 0; i < m; i++)
                {
                    a = Math.PI * (i) / (m - 1);
                    b = 2 * Math.PI * (j) / (p - 1);
                    parallels[j, i] = (Func(a, b));
                    meredians[i, j] = parallels[j, i];
                }
        }
    }
}

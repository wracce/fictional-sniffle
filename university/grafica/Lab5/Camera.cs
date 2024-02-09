using System;
using System.Drawing;
using System.Windows.Media.Media3D;

namespace Lab5
{
    class Camera
    {
        private double z, pz, grad;
        int width, height;

        public Camera(double _z, double _grad, int _width, int _height)
        {
            z = _z;
            width = _width;
            height = _height;
            grad = _grad;
            setPZ();

        }

        public double Grad
        {
            set 
            { 
                grad = value;
                setPZ();
            }
        }

        public double Z
        {
            set { z = value; }
        }
        private void setPZ()
        {
            double a = grad * Math.PI / 360;
            pz = z - (1/Math.Tan(a)) * Math.Sqrt(width * width + height * height);
        } 
        public Point getProection(Point3D p2)
        {
            double x1, y1;

            x1 = (p2.X) * (z - pz) / (z - p2.Z);
            y1 = (p2.Y) * (z - pz) / (z - p2.Z);
            return new Point((int)x1, (int)y1);
        }
    }
}

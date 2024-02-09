namespace lab4
{
    class Matr
    {
        // поля
        private int _n;
        private int[,] _mass;

        // Конструкторы
        public Matr() { }

        public Matr(int n)
        {
            _n = n;
            _mass = new int[_n, _n];
        }

        public Matr(int[,] arr)
        {
            _n = arr.GetLength(0);
            _mass = arr;
        }

        // Свойства
        public int N
        {
            get { return _n; }
            set { if (value > 0) _n = value; }
        }

        public int this[int i, int j]
        {
            get
            {
                return _mass[i, j];
            }
            set
            {
                _mass[i, j] = value;
            }
        }

        // Умножение матриц
        public static Matr operator *(Matr a, int ch)
        {
            Matr resMass = new Matr(a.N);
            for (int i = 0; i < a.N; i++)
                for (int j = 0; j < a.N; j++)
                    resMass[i, j] = a[i, j] * ch;
            return resMass;
        }

        public static Matr operator *(int ch, Matr a)
        {
            return (a*ch);
        }

        public static Matr operator *(Matr a, Matr b)
        {
            Matr resMass = new Matr(a.N);
            for (int i = 0; i < a.N; i++)
                for (int j = 0; j < b.N; j++)
                    for (int k = 0; k < b.N; k++)
                        resMass[i, j] += a[i, k] * b[k, j];

            return resMass;
        }

        // Сложение Матриц
        public static Matr operator +(Matr a, Matr b)
        {
            Matr resMass = new Matr(a.N);
            for (int i = 0; i < a.N; i++)
            {
                for (int j = 0; j < b.N; j++)
                {
                    resMass[i, j] = a[i, j] + b[i, j];
                }
            }
            return resMass;
        }

        // Вычитание матриц
        public static Matr operator -(Matr a, Matr b)
        {
            Matr resMass = new Matr(a.N);
            for (int i = 0; i < a.N; i++)
            {
                for (int j = 0; j < b.N; j++)
                {
                    resMass[i, j] = a[i, j] - b[i, j];
                }
            }
            return resMass;
        }
    }
}

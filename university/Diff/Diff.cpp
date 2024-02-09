//
// Created by Boss on 11.04.2021.
//

#include "Diff.h"
#include <iostream>
/*
 * Конструктор
 */
Diff::Diff(double _h, double _xa, double _xb, double _ya, double _yb) {
    h = _h;
    xa = _xa;
    xb = _xb;
    ya = _ya;
    yb = _yb;

    lineSeries = new QLineSeries();
    lineSeriesProgonka = new QLineSeries();
    lineSeriesDelta = new QLineSeries();
    lineSeriesRunge = new QLineSeries();

    setLineSeries();
    setLineSeriesSetka();
}

/*
 * Свойства
 */
QLineSeries *Diff::getLineSeries() {
    return lineSeries;
}

QLineSeries *Diff::getLineSeriesSetka() {
    return lineSeriesProgonka;
}

QLineSeries *Diff::getLineSeriesDelta() {
    return lineSeriesDelta;
}

QLineSeries *Diff::getLineSeriesRunge() {
    return lineSeriesRunge;
}

double Diff::getH() {
    return h;
}

/*
 * Методы вычисления ОДУ + погрешность
 */
void Diff::setLineSeries() {
    double x, y;
    x = xa; int i = 0;
    int n = ((xb - xa) / h);
    while (i <= n)
    {
        y = func0(x);
        lineSeries->append(x,y);
        x += h;
        i++;
    }
}

void Diff::setDelta() {
    double x, y1, y2, delta, max;
    for (int i = 0; i < lineSeries->count(); i++) {
        y1 = lineSeries->at(i).y();

        x = lineSeriesProgonka->at(i).x();
        y2 = lineSeriesProgonka->at(i).y();
        delta = abs(y1-y2);
        if (i ==0)
            max = delta;
        if (delta > max)
            max = delta;
        lineSeriesDelta->append(x,delta);
    }
    lineSeriesDelta->append(xb+1,max);

    Diff *diff2 = new Diff(2*h,xa,xb, ya, yb);

    for (int i = 0; i < getLineSeries()->count(); i++) {
        x = getLineSeriesSetka()->at(i).x();
        y1 = getLineSeriesSetka()->at(i).y();
        y2 = diff2->getLineSeriesSetka()->at(i / 2).y();
        if (x == diff2->getLineSeriesSetka()->at(i / 2).x())
            delta = abs(y1 - y2);
        else
            delta = 0;
        if (i == 0)
            max = delta;
        if (delta > max)
            max = delta;
        lineSeriesRunge->append(x, delta);
    }
    lineSeriesRunge->append(xb+1,max);
    delete diff2;
}


void Diff::setLineSeriesSetka() {
    int n = 1+((xb - xa) / h);

    // Функция
    int i[n];
    double x[n];
    double y[n];
    double p[n];
    double q[n];
    double f[n];

    // Трехдиагональная матрица
    double a[n];
    double b[n];
    double c[n];

    //Прогоночные коэфициенты
    double A[n];
    double B[n];

    // Создание Трехдиагональной матрицы
    for (int k = 0; k < n; k++) {
        i[k] = k;
        x[k] = getX(k);
        q[k] = getQ(x[k]);
        p[k] = getP(x[k]);
        f[k] = getF(x[k]);
        a[k] = getYmin1(p[k]);
        b[k] = getY0(q[k]);
        c[k] = getY1(p[k]);
    }

    a[n-1] = -1;
    b[n-1] = 1;
    c[n-1] = 0;
    f[n-1] = yb*h;
    a[0] = 0;
    b[0] = 1;
    c[0] = 0;
    f[0] = ya;
    y[0] = ya;

    // Метод прогонки
    A[0] = (-1*c[0])/b[0];
    B[0] = (f[0])/b[0];
    for (int k = 1; k < n-1; k++)
    {
        A[k] = getA(a[k], b[k], c[k],A[k-1]);
        B[k] = getB(a[k], b[k], f[k],A[k-1], B[k-1]);
    }
    A[n-1] = 0;
    B[n-1] = getB(a[n-1], b[n-1], f[n-1],A[n-2], B[n-2]);

    y[n-1] = B[n-1];
    for (int k = n-2; k >= 1; k--)
        y[k] = A[k]*y[k+1]+ B[k];

    qInfo() << y[n];
    for (int k=0; k<n; k++)
        lineSeriesProgonka->append(x[k], y[k]);
}

/*
 * Математические формулы
 */
double Diff::func0(double x) {
    double y;
    y = exp(2*x)*((1-sin(5*x)/25)+(x*(50+exp(4)*(2*sin(10)+5*cos(10)-50)))/(125*exp(4)));
    return y;
}

double Diff::getX(int k) {
    return xa + k*h;
}

double Diff::getF(double x) {
    return exp(2*x)*sin(5*x);
}

double Diff::getP(double x) {
    return -4;
}

double Diff::getQ(double x) {
    return 4;
}

double Diff::getYmin1(double p) {
    return ((1/pow(h,2))-p/(2*h));
}

double Diff::getY1(double p) {
    return ((1/pow(h,2))+p/(2*h));
}

double Diff::getY0(double q) {
    return (q-2/pow(h,2));
}

double Diff::getA(double _a, double _b, double _c, double _A) {
    return ( -1 * _c )/( _b + _a * _A );
}

double Diff::getB(double _a, double _b, double _f, double _A, double _B) {
    return (_f - _a * _B )/( _b + _a * _A );
}

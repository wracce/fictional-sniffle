//
// Created by Boss on 11.04.2021.
//

#ifndef DIFF1_DIFF_H
#define DIFF1_DIFF_H

#include <QtCharts>
#include <cmath>


class Diff {
private:
    double h, xa, xb, ya, yb;
    QLineSeries *lineSeries;
    QLineSeries *lineSeriesProgonka;
    QLineSeries *lineSeriesDelta;
    QLineSeries *lineSeriesRunge;

    double func0(double);
    void setLineSeries();
    void setLineSeriesSetka();
    double getYmin1(double);
    double getY0(double);
    double getY1(double);
    double getF(double);
    double getP(double);
    double getQ(double);
    double getX(int );
    double getA(double, double, double, double );
    double getB(double, double, double, double, double);
public:
    Diff(double, double, double, double, double);
    QLineSeries *getLineSeries();
    QLineSeries *getLineSeriesSetka();
    QLineSeries *getLineSeriesDelta();
    QLineSeries *getLineSeriesRunge();
    void setDelta();
    double getH();
};


#endif //DIFF1_DIFF_H

//
// Created by Boss on 10.04.2021.
//

#ifndef DIFF1_MAINWINDOW_H
#define DIFF1_MAINWINDOW_H

#include <QMainWindow>
#include <QPushButton>
#include <QtCharts>
#include <QSpinBox>
#include "Diff.h"
#include "ChartView.h"

class MainWindow : public QMainWindow {
    Q_OBJECT
public:
    MainWindow(QWidget *parent = 0);
private:
    ChartView *qChartView;
    QDoubleSpinBox *qDoubleSpinBox;
    QStatusBar *statusbar;
    QLabel *labelBar;
    QWidget *centralwidget;
    QMenuBar *menubar;
    QMenu *menu;
    QAction *action;
    QWidget *horizontalLayoutWidget;
    QHBoxLayout *horizontalLayout;
    QTableWidget *tableWidget;
    QChart *qChart;
private slots:
    void onClick();
};


#endif //DIFF1_MAINWINDOW_H

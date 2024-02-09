//
// Created by Boss on 10.04.2021.
//
#include "MainWindow.h"

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent) {
    /*
 * Интерфейс программы
 */
    this->setWindowTitle("Дифуры");
    this->setFixedSize(1280, 720);

    //Меню
    menubar = new QMenuBar(this);
    menubar->setGeometry(QRect(0, 0, 539, 26));
    this->setMenuBar(menubar);
    menu = new QMenu("Начать заново", menubar);
    action = new QAction("Начать заново", menubar);
    menubar->addAction(action);


    // Центр программы + сетка
    centralwidget = new QWidget(this);
    this->setCentralWidget(centralwidget);

    // Статус
    statusbar = new QStatusBar(this);
    labelBar = new QLabel(statusbar);
    statusbar->addWidget(labelBar);
    this->setStatusBar(statusbar);
    statusbar->setSizeGripEnabled(false);
    statusbar->setStyleSheet("QStatusBar{border-top: 1px outset grey;}");

    // Векторы
    Diff *diff = new Diff(0.01,0,2,1,2);
    diff->setDelta();
    QLineSeries *lineSeries1 = diff->getLineSeries();
    lineSeries1->setName("f(x)");
    QLineSeries *lineSeries2 = diff->getLineSeriesSetka();
    lineSeries2->setName("Метод сетки");
    QLineSeries *lineSeries3 = diff->getLineSeriesDelta();
    QLineSeries *lineSeries4 = diff->getLineSeriesRunge();

    // График
    qChart = new QChart();
    qChart->addSeries(lineSeries1);
    qChart->addSeries(lineSeries2);
    qChart->createDefaultAxes();
    qChart->setTitle("График функций");

    qChartView = new ChartView(qChart, centralwidget);
    qChartView->setGeometry(QRect(10, 9, 651, 651));

    tableWidget = new QTableWidget(centralwidget);
    tableWidget->setGeometry(QRect(670, 10, 601, 651));
    tableWidget->setColumnCount(5);
    tableWidget->setHorizontalHeaderLabels({"x", "y", "y (метод сетки)", "Δ", "Δ Рунге"});
    tableWidget->setRowCount(lineSeries1->count()+1);
    for (int k=0; k<lineSeries1->count();k++) {
        tableWidget->setItem(k,0,new QTableWidgetItem(QString::number(lineSeries1->at(k).x(),'g', 10)));
        tableWidget->setItem(k,1,new QTableWidgetItem(QString::number(lineSeries1->at(k).y(),'g', 10)));
        tableWidget->setItem(k,2,new QTableWidgetItem(QString::number(lineSeries2->at(k).y(),'g', 10)));
        tableWidget->setItem(k,3,new QTableWidgetItem(QString::number(lineSeries3->at(k).y(),'g', 10)));
        tableWidget->setItem(k,4,new QTableWidgetItem(QString::number(lineSeries4->at(k).y(),'g', 10)));
    }
    tableWidget->setItem(lineSeries1->count(),3,new QTableWidgetItem(QString::number(lineSeries3->at(lineSeries3->count()-1).y(),'g', 10)));
    tableWidget->setItem(lineSeries1->count(),4,new QTableWidgetItem(QString::number(lineSeries4->at(lineSeries4->count()-1).y(),'g', 10)));

    labelBar->setText("h = " + QString::number(diff->getH()));

    connect(action, &QAction::triggered, this, &MainWindow::onClick);

}

void MainWindow::onClick() {
    qChart->zoomReset();
}


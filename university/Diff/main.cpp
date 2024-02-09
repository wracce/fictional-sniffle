#include <QApplication>
#include "MainWindow.h"



int main(int argc, char *argv[]) {

    QApplication::setStyle(QStyleFactory::create("fusion"));
    QApplication app(argc, argv);
    MainWindow window;

    window.resize(1920, 1024);
    window.setWindowTitle("Дифуры.Лаба1");
    window.show();

    return app.exec();
}
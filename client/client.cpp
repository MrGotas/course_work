#include <iostream>
#include <string>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

using namespace std;

int main() {
    int client_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (client_socket == -1) {
        cerr << "Ошибка создания сокета" << endl;
        return 1;
    }

    sockaddr_in server_address{};
    server_address.sin_family = AF_INET;
    server_address.sin_port = htons(8080); // Порт 8080
    inet_pton(AF_INET, "127.0.0.1", &server_address.sin_addr); // IP-адрес сервера

    if (connect(client_socket, (struct sockaddr*)&server_address, sizeof(server_address)) == -1) {
        cerr << "Ошибка подключения к серверу" << endl;
        close(client_socket);
        return 1;
    }

    cout << "Подключение к серверу установлено. Введите сообщения:" << endl;

    string message;
    while (true) {
        cout << "> ";
        getline(cin, message);
        if (message == "exit") {
            break;
        }
        send(client_socket, message.c_str(), message.size(), 0);
    }

    close(client_socket);
    return 0;
}

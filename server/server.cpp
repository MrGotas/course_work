#include <iostream>
#include <string>
#include <thread>
#include <vector>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

using namespace std;

void handle_client(int client_socket) {
    char buffer[1024];
    while (true) {
        memset(buffer, 0, sizeof(buffer));
        int bytes_received = recv(client_socket, buffer, sizeof(buffer) - 1, 0);
        if (bytes_received <= 0) {
            cout << "Клиент отключился" << endl;
            close(client_socket);
            break;
        }
        cout << "Сообщение от клиента: " << buffer << endl;
    }
}

int main() {
    int server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket == -1) {
        cerr << "Ошибка создания сокета" << endl;
        return 1;
    }

    sockaddr_in server_address{};
    server_address.sin_family = AF_INET;
    server_address.sin_port = htons(8080); // Порт 8080
    server_address.sin_addr.s_addr = INADDR_ANY; // Прослушивание на всех сетевых интерфейсах

    if (bind(server_socket, (struct sockaddr*)&server_address, sizeof(server_address)) == -1) {
        cerr << "Ошибка привязки сокета" << endl;
        close(server_socket);
        return 1;
    }

    if (listen(server_socket, 5) == -1) {
        cerr << "Ошибка запуска прослушивания" << endl;
        close(server_socket);
        return 1;
    }

    cout << "Сервер запущен и ожидает подключения на порту 8080..." << endl;

    vector<thread> client_threads;
    while (true) {
        sockaddr_in client_address{};
        socklen_t client_len = sizeof(client_address);
        int client_socket = accept(server_socket, (struct sockaddr*)&client_address, &client_len);
        if (client_socket == -1) {
            cerr << "Ошибка подключения клиента" << endl;
            continue;
        }
        cout << "Клиент подключился" << endl;
        client_threads.emplace_back(handle_client, client_socket);
    }

    for (auto& t : client_threads) {
        if (t.joinable()) {
            t.join();
        }
    }

    close(server_socket);
    return 0;
}

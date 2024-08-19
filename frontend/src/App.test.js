import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

test("renders the App component and performs real requests", async () => {
  // Мокаем запросы
  axios.get.mockResolvedValue({ data: { csrfToken: "mock-csrf-token" } });
  axios.post.mockResolvedValue({
    data: [
      { url: "https://example.com", metadata: { title: "Example Title" } },
    ],
  });

  render(<App />);

  // Проверяем наличие заголовка
  expect(screen.getByText("URL Metadata Fetcher")).toBeInTheDocument();

  // Оборачиваем взаимодействия с элементами в act(...)
  await act(async () => {
    // Заполняем поле и отправляем форму
    const input = screen.getByPlaceholderText("Enter URL 1");
    input.value = "https://example.com";

    const submitButton = screen.getByText("Submit");
    submitButton.click();
  });

  // Ожидание и проверка результатов
  await waitFor(() => {
    expect(screen.getByText("Metadata Results:")).toBeInTheDocument();
    expect(screen.getByText("https://example.com")).toBeInTheDocument();
  });
});

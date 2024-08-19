import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import URLForms from "./URLForms";
import MetadataResults from "./MetadataResults";

// Mocking axios to prevent real network requests
jest.mock("axios");

describe("URLForms", () => {
  // Set up the mock responses before each test
  beforeEach(() => {
    // Mock the GET request to fetch the CSRF token
    axios.get.mockResolvedValue({ data: { csrfToken: "mock-csrf-token" } });

    // Mock the POST request to fetch metadata
    axios.post.mockResolvedValue({
      data: [
        { url: "https://example.com", metadata: { title: "Example Title" } },
      ],
    });
  });

  // Test for displaying an error message when an invalid URL is entered
  test("displays error message for invalid URLs", async () => {
    // Render the URLForms component
    render(<URLForms setMetadata={() => {}} />);

    // Find the first input field and the submit button
    const input = screen.getByPlaceholderText("Enter URL 1");
    const submitButton = screen.getByText("Submit");

    // Simulate entering an invalid URL and clicking the submit button
    await act(async () => {
      fireEvent.change(input, { target: { value: "invalid-url" } });
      fireEvent.click(submitButton);
    });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText("Invalid URL")).toBeInTheDocument();
    });

    // Wait for the form validation error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText("Please correct the invalid URLs before submitting.")
      ).toBeInTheDocument();
    });
  });

  // Test for validating URLs and removing error messages when the URL is valid
  test("validates the URL and displays an error message for an invalid URL", async () => {
    // Render the URLForms component
    render(<URLForms setMetadata={() => {}} />);

    // Find the first input field
    const input1 = screen.getByPlaceholderText("Enter URL 1");

    // Simulate entering an invalid URL
    await act(async () => {
      fireEvent.change(input1, { target: { value: "invalid-url" } });
    });

    // Verify that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Invalid URL")).toBeInTheDocument();
    });

    // Simulate entering a valid URL
    await act(async () => {
      fireEvent.change(input1, { target: { value: "https://example.com" } });
    });

    // Verify that the error message disappears
    await waitFor(() => {
      expect(screen.queryByText("Invalid URL")).not.toBeInTheDocument();
    });
  });

  // Test for automatically adding a 4th URL input when the 3rd URL is filled
  test("4th URL input is enabled if the 3rd URL is filled", async () => {
    // Render the URLForms component
    render(<URLForms setMetadata={() => {}} />);

    // Find the first three input fields
    const input1 = screen.getByPlaceholderText("Enter URL 1");
    const input2 = screen.getByPlaceholderText("Enter URL 2");
    const input3 = screen.getByPlaceholderText("Enter URL 3");

    // Simulate entering valid URLs in the first three fields
    await act(async () => {
      fireEvent.change(input1, { target: { value: "https://example1.com" } });
      fireEvent.change(input2, { target: { value: "https://example2.com" } });
      fireEvent.change(input3, { target: { value: "https://example3.com" } });
    });

    // Verify that a 4th input field appears
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter URL 4")).toBeInTheDocument();
    });
  });
});

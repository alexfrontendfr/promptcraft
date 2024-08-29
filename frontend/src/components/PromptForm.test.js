import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PromptForm from "./PromptForm";

test("renders PromptForm and submits data", () => {
  const mockSubmit = jest.fn();
  render(<PromptForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText(/Original Prompt/i), {
    target: { value: "Test prompt" },
  });

  fireEvent.change(screen.getByLabelText(/Technique/i), {
    target: { value: "zero-shot" },
  });

  fireEvent.click(screen.getByText(/Refine Prompt/i));

  expect(mockSubmit).toHaveBeenCalledWith({
    originalPrompt: "Test prompt",
    technique: "zero-shot",
  });
});

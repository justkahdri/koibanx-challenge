// __tests__/CheckboxWithLabel-test.js
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Searcher from "../../components/Searcher";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
describe("Searcher suite", () => {
  afterEach(cleanup);

  it("Enter fires sumbit", () => {
    const mockSearch = (query: string, filters: TFilters) => {};

    const searcher = render(
      <Searcher handleSearch={mockSearch} loading={false} />
    );

    expect(searcher.queryByLabelText(/no activos/i)).toBeTruthy();

    fireEvent.click(searcher.getByLabelText(/no activos/i));

    expect(searcher.queryByLabelText(/todos/i)).toBeTruthy();
  });
});

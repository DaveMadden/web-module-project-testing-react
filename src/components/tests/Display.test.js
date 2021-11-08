import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Display from './../Display';
import userEvent from '@testing-library/user-event';

import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');


const testShow = {
    name: "Wendell Berry's Shop of Horrors",
    summary: "shares stories of our lost agrarian roots",
    seasons: [
        {
            id: 1,
            name: "The World-Ending Fire",
            episodes: []
        },
        {
            id: 2,
            name: "What are people for?",
            episodes: []
        },
        {
            id: 3,
            name: "Building Soil",
            episodes: []
        }
    ]
}

test("renders without error", () => {
    render(<Display />)
});


test("when fetch button is pressed, show component displays (taking into account API call)", async () => {
    
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display/>)
    const button = screen.getByRole("button");
    userEvent.click(button);

    const showComp = await screen.findByTestId("show-container");
    expect(showComp).toBeInTheDocument();
});


test("when fetch button is pressed, count of select options matches data", async () => {
    
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display/>);

    const button = screen.getByRole("button");
    userEvent.click(button);

    const seasons = await screen.findAllByTestId("season-option");
    
    expect(seasons.length).toBe(3);
});


test("when fetch button is pressed, passed function is called", async () => {
    const fakeFunc = jest.fn();

    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display displayFunc={fakeFunc}/>);

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => expect(fakeFunc).toHaveBeenCalled());
    // await expect(fakeFunc).toHaveBeenCalled();
});










///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
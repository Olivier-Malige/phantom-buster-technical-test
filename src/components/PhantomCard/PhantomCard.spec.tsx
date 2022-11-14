import '@testing-library/jest-dom/extend-expect';

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import type { PhantomCardProps } from './PhantomCard';
import { PhantomCard } from './PhantomCard';

const defaultProps: PhantomCardProps = {
  id: '123',
  launchType: 'manually',
  name: 'test-name',
  onDelete: () => null,
  onDuplicate: () => null,
  onRename: () => null,
  repeatedLaunchTimes: 'repeat-frequency-test',
};

describe('PhantomCard', () => {
  test('Should render default', () => {
    const { baseElement } = render(<PhantomCard {...defaultProps} />);
    expect(baseElement).toBeVisible();
    expect(screen.getByText(defaultProps.name)).toBeVisible();
    expect(
      screen.getByRole('heading', { name: defaultProps.name }).tagName
    ).toBe('H2');
    expect(screen.getByText('Launch manually')).toBeVisible();
    expect(screen.getByTestId('dropDownMenu')).toBeVisible();
    expect(screen.queryByTestId('rename-modal-123')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-modal-123')).not.toBeInTheDocument();
  });

  test('Should render with repeatedly launchType setup', () => {
    render(
      <PhantomCard
        {...defaultProps}
        launchType="repeatedly"
        nextLaunchIn={1000}
      />
    );
    expect(screen.getByText('repeat-frequency-test')).toBeVisible();
    expect(screen.getByText('1000')).toBeVisible();
  });

  test('Should call onRename', async () => {
    const onRenameMock = jest.fn((id, value) => ({
      id,
      value,
    }));
    render(<PhantomCard {...defaultProps} onRename={onRenameMock} />);

    screen.getByTestId('dropDownMenu').click();

    act(() => {
      screen.getByTestId('dropDownMenu-rename').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('rename-modal-123')).toBeVisible();
    });

    const input = screen.getByTestId('input-rename');
    expect(input).toHaveValue('test-name');
    fireEvent.change(input, { target: { value: 'toto' } });

    act(() => {
      screen.getByTestId('rename-modal-123-ok').click();
    });

    expect(input).toHaveValue('toto');
    await waitFor(() => expect(onRenameMock).toHaveBeenCalled());

    expect(onRenameMock.mock.results[0]?.value).toStrictEqual({
      id: '123',
      value: 'toto',
    });
  });

  test('Should call onDuplicate', async () => {
    const onDuplicateMock = jest.fn();
    render(<PhantomCard {...defaultProps} onDuplicate={onDuplicateMock} />);

    screen.getByTestId('dropDownMenu').click();
    screen.getByTestId('dropDownMenu-duplicate').click();

    await waitFor(() => expect(onDuplicateMock).toHaveBeenCalled());
  });

  test('Should call onDelete', async () => {
    const onDeleteMock = jest.fn();
    render(<PhantomCard {...defaultProps} onDelete={onDeleteMock} />);

    screen.getByTestId('dropDownMenu').click();

    act(() => {
      screen.getByTestId('dropDownMenu-delete').click();
    });

    await waitFor(() => {
      act(() => {
        screen.getByTestId('delete-modal-123-ok').click();
      });
    });

    await waitFor(() => expect(onDeleteMock).toHaveBeenCalled());
  });

  test('Should do a cancel', async () => {
    const onDeleteMock = jest.fn();
    render(<PhantomCard {...defaultProps} onDelete={onDeleteMock} />);

    screen.getByTestId('dropDownMenu').click();

    act(() => {
      screen.getByTestId('dropDownMenu-delete').click();
    });

    await waitFor(() => {
      act(() => {
        screen.getByTestId('delete-modal-123-cancel').click();
      });
    });

    await waitFor(() => expect(onDeleteMock).not.toHaveBeenCalled());
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Settings } from 'luxon';
import { fromISO } from 'common/api/date';
import { URLS } from 'common/urls';
import PatronLoansTable from '../PatronLoansTable';

Settings.defaultZoneName = 'utc';
const d = fromISO('2018-01-01T11:05:00+01:00');

describe('PatronLoansTable tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  const patron = {
    patron_pid: 2,
  };

  it('should load the details component', () => {
    const mockedFetchPatronLoans = jest.fn();
    const mockedPatronLoansChangeSortBy = jest.fn();
    const mockedPatronLoansChangeSortOrder = jest.fn();

    const component = shallow(
      <PatronLoansTable
        history={() => {}}
        data={[]}
        loanState=""
        fetchPatronLoans={mockedFetchPatronLoans}
        patronLoansChangeSortBy={mockedPatronLoansChangeSortBy}
        patronLoansChangeSortOrder={mockedPatronLoansChangeSortOrder}
        currentSortBy=""
        currentSortOrder=""
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should render show a message with no user loans', () => {
    const mockedFetchPatronLoans = jest.fn();
    const mockedPatronLoansChangeSortBy = jest.fn();
    const mockedPatronLoansChangeSortOrder = jest.fn();
    component = mount(
      <PatronLoansTable
        patron={patron.patron_pid}
        history={() => {}}
        data={[]}
        loanState=""
        fetchPatronLoans={mockedFetchPatronLoans}
        patronLoansChangeSortBy={mockedPatronLoansChangeSortBy}
        patronLoansChangeSortOrder={mockedPatronLoansChangeSortOrder}
        currentSortBy=""
        currentSortOrder=""
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere(element => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });

  it('should render patron loans', () => {
    const mockedFetchPatronLoans = jest.fn();
    const mockedPatronLoansChangeSortBy = jest.fn();
    const mockedPatronLoansChangeSortOrder = jest.fn();
    const data = [
      {
        loan_pid: 'loan1',
        patron_pid: 'patron_1',
        updated: d,
        start_date: d,
        end_date: d,
      },
      {
        loan_pid: 'loan2',
        patron_pid: 'patron_1',
        updated: d,
        start_date: d,
        end_date: d,
      },
    ];

    component = mount(
      <PatronLoansTable
        patron={patron.patron_pid}
        history={() => {}}
        data={data}
        loanState=""
        fetchPatronLoans={mockedFetchPatronLoans}
        patronLoansChangeSortBy={mockedPatronLoansChangeSortBy}
        patronLoansChangeSortOrder={mockedPatronLoansChangeSortOrder}
        currentSortBy=""
        currentSortOrder=""
      />
    );

    expect(component).toMatchSnapshot();
    const rows = component
      .find('TableRow')
      .filterWhere(
        element =>
          element.prop('data-test') === 'loan1' ||
          element.prop('data-test') === 'loan2'
      );
    expect(rows).toHaveLength(2);

    const footer = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === 'footer');
    expect(footer).toHaveLength(0);
  });

  it('should render the show all button when showing only a few patron loans', () => {
    const mockedFetchPatronLoans = jest.fn();
    const mockedPatronLoansChangeSortBy = jest.fn();
    const mockedPatronLoansChangeSortOrder = jest.fn();
    const data = [
      {
        loan_pid: 'loan1',
        patron_pid: 'patron_1',
        updated: d,
        start_date: d,
        end_date: d,
      },
      {
        loan_pid: 'loan2',
        patron_pid: 'patron_2',
        updated: d,
        start_date: d,
        end_date: d,
      },
    ];

    component = mount(
      <PatronLoansTable
        patron={patron.patron_pid}
        history={() => {}}
        data={data}
        fetchPatronLoans={mockedFetchPatronLoans}
        patronLoansChangeSortBy={mockedPatronLoansChangeSortBy}
        patronLoansChangeSortOrder={mockedPatronLoansChangeSortOrder}
        currentSortBy=""
        currentSortOrder=""
        showMaxLoans={1}
      />
    );

    expect(component).toMatchSnapshot();
    const footer = component
      .find('TableFooter')
      .filterWhere(element => element.prop('data-test') === 'footer');
    expect(footer).toHaveLength(1);
  });

  it('should go to loan details when clicking on a patron loan', () => {
    const mockedHistoryPush = jest.fn();
    const mockedPatronLoansChangeSortBy = jest.fn();
    const mockedPatronLoansChangeSortOrder = jest.fn();
    const historyFn = {
      push: mockedHistoryPush,
    };

    const data = [
      {
        loan_pid: 'loan1',
        patron_pid: 'patron_1',
        updated: d,
        start_date: d,
        end_date: d,
      },
    ];

    const mockedFetchPatronLoans = jest.fn();
    component = mount(
      <PatronLoansTable
        patron={patron.patron_pid}
        history={historyFn}
        data={data}
        loanState=""
        fetchPatronLoans={mockedFetchPatronLoans}
        patronLoansChangeSortBy={mockedPatronLoansChangeSortBy}
        patronLoansChangeSortOrder={mockedPatronLoansChangeSortOrder}
        currentSortBy=""
        currentSortOrder=""
        showMaxLoans={1}
      />
    );

    const firstId = data[0].loan_pid;
    const button = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === firstId)
      .find('i');
    button.simulate('click');

    const expectedParam = URLS.loanDetails(firstId);
    expect(mockedHistoryPush).toHaveBeenCalledWith(expectedParam);
  });
});
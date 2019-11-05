export const invenioConfig = {
  items: {
    canCirculateStates: ['CAN_CIRCULATE'],
  },
  circulation: {
    loanRequestStates: ['PENDING'],
    loanActiveStates: ['ITEM_ON_LOAN'],
    loanCompletedStates: ['ITEM_RETURNED'],
    loanCancelledStates: ['CANCELLED'],
    deliveryMethods: { DELIVERY: '', 'PICK UP': '' },
    requestDuration: 60,
  },
  relationTypes: [
    {
      id: 0,
      name: 'language',
      label: 'Language',
    },
    {
      id: 1,
      name: 'edition',
      label: 'Edition',
    },
    {
      id: 2,
      name: 'multipart_monograph',
      label: 'Multipart monograph',
    },
    {
      id: 3,
      name: 'serial',
      label: 'Serial',
    },
    {
      id: 4,
      name: 'other',
      label: 'Other',
    },
  ],
};

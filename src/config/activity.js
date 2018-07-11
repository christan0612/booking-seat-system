let activityDTO = {
  eventDTO: {
    'id': 12,
    'ticketDTOList': [
      {
        'id': 13,
        'name': 'normal',
        'color': 'rgba(185, 46, 223, 0.4)',
        'price': 1000
      },
      {
        'id': 14,
        'name': 'VIP',
        'color': 'rgba(79, 187, 93, 0.4)',
        'price': 3000
      },
      {
        'id': 15,
        'name': 'super VIP',
        'color': 'rgba(160, 46, 48, 0.4)',
        'price': 10000
      }
    ],
    'seatRowDTOList': [
      {
        'name': 'A',
        'count': 5,
        'seatGroupDTOList': [
          {
            'groupType': 'type-2',
            'ticketDTO': {
              'id': 13,
              'name': 'normal',
              'color': 'rgba(185, 46, 223, 0.4)',
              'price': 1000
            },
            'seatDTOList': [
              {
                'id': 80,
                'number': 1,
                'fullSeatNumber': 'A1',
                'status': 'E'
              },
              {
                'id': 83,
                'number': 2,
                'fullSeatNumber': 'A2',
                'status': 'E'
              }
            ]
          },
          {
            'groupType': 'type-3',
            'ticketDTO': {
              'id': 14,
              'name': 'VIP',
              'color': 'rgba(79, 187, 93, 0.4)',
              'price': 3000
            },
            'seatDTOList': [
              {
                'id': 81,
                'number': 3,
                'fullSeatNumber': 'A3',
                'status': 'E'
              },
              {
                'id': 78,
                'number': 4,
                'fullSeatNumber': 'A4',
                'status': 'E'
              },
              {
                'id': 84,
                'number': 5,
                'fullSeatNumber': 'A5',
                'status': 'E'
              }
            ]
          }
        ]
      },
      {
        'name': 'B',
        'count': 7,
        'seatGroupDTOList': [
          {
            'groupType': 'type-2',
            'ticketDTO': {
              'id': 14,
              'name': 'VIP',
              'color': 'rgba(79, 187, 93, 0.4)',
              'price': 3000
            },
            'seatDTOList': [
              {
                'id': 87,
                'number': 1,
                'fullSeatNumber': 'B1',
                'status': 'E'
              },
              {
                'id': 82,
                'number': 2,
                'fullSeatNumber': 'B2',
                'status': 'E'
              }
            ]
          },
          {
            'groupType': 'type-3',
            'ticketDTO': {
              'id': 14,
              'name': 'VIP',
              'color': 'rgba(79, 187, 93, 0.4)',
              'price': 3000
            },
            'seatDTOList': [
              {
                'id': 85,
                'number': 3,
                'fullSeatNumber': 'B3',
                'status': 'E'
              },
              {
                'id': 79,
                'number': 4,
                'fullSeatNumber': 'B4',
                'status': 'E'
              },
              {
                'id': 76,
                'number': 5,
                'fullSeatNumber': 'B5',
                'status': 'E'
              }
            ]
          },
          {
            'groupType': 'type-1',
            'ticketDTO': {
              'id': 15,
              'name': 'super VIP',
              'color': 'rgba(160, 46, 48, 0.4)',
              'price': 10000
            },
            'seatDTOList': [
              {
                'id': 86,
                'number': 6,
                'fullSeatNumber': 'B6',
                'status': 'E'
              }
            ]
          },
          {
            'groupType': 'type-1',
            'ticketDTO': {
              'id': 15,
              'name': 'super VIP',
              'color': 'rgba(160, 46, 48, 0.4)',
              'price': 10000
            },
            'seatDTOList': [
              {
                'id': 77,
                'number': 7,
                'fullSeatNumber': 'B7',
                'status': 'E'
              }
            ]
          }
        ]
      }
    ]
  }
}
export default activityDTO

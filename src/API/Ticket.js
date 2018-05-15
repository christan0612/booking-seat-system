import request from '@/utils/request'

/**
 * 建立票卷
 */
export function createTicket (ticketInfo) {
  return request({
    url: `/ticket`,
    method: 'POST',
    data: ticketInfo
  })
}

/**
 * 建立活動
 */
export function createEvent (eventInfo) {
  return request({
    url: `/event`,
    method: 'POST',
    data: eventInfo
  })
}

/**
 * 取得活動資訊
 */
export function getEvent (id) {
  return request({
    url: `/event/${id}`,
    method: 'GET'
  })
}

/**
 * 購買票卷
 */
export function purchaseTicket (id, purchaseInfo) {
  return request({
    url: `/purchase/${id}`,
    method: 'POST',
    data: purchaseInfo
  })
}

import request from '@/utils/request'
export function test(data){
    return request({
        url: '/example/1620918378659',
        method: 'get',
        data
      })
}
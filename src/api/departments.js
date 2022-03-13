import request from '@/utils/request.js'

// 查询企业的部门列表
export function getDepartments() {
  return request({
    url: `/company/department`,
    method: 'GET'
  })
}

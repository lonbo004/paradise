import axiosProxy from './config';

export function GetInfo(SiteCode, MemberCode) {
  return axiosProxy({
    url: "/ParadiseApi/Api_GetInfo",
    method: "post",
    data: {
      SiteCode, MemberCode
    }
  })
}
export function Member_Login(account, password) {
  return axiosProxy({
    url: "/ParadiseApi/Api_Member_Login",
    method: "post",
    data: {
      account, password
    }
  })
}
// export function logout() {
//   return axiosProxy({
//     url: "/api/logout.php",
//     method: "post"
//   })
// }

// export function getApplications(from_date, to_date, limit, skip, keyword) {
//   return axiosProxy({
//     url: "/api/application.php",
//     method: "get",
//     params: {
//       from_date, to_date, limit, skip, keyword
//     }
//   })
// }
// export function updateIsChecked(id, is_checked) {
//   return axiosProxy({
//     url: "/api/application.php",
//     method: "patch",
//     data: {
//       id,
//       data: {
//         is_checked
//       }
//     }
//   })
// }
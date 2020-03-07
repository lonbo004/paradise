import axiosProxy from './config';
import store from '@/store';
export function GetInfo(MemberCode) {
  return axiosProxy({
    url: "/ParadiseApi/Api_GetInfo",
    method: "post",
    data: {
      SiteCode: store.state.SiteCode,
      MemberCode
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
//Lady
export function Lady_Firstpage_Search(town_code) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Firstpage_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      town_code
    }
  })
}
export function Lady_GetOne(ladycode) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_GetOne",
    method: "post",
    data: {
      sitecode: store.state.SiteCode,
      ladycode
    }
  })
}
export function Lady_Keywords_Search(keywords, page, page_range) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Keywords_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      keywords,
      page,
      page_range
    }
  })
}
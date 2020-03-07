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
export function Lady_Search({
  name,
  town_code,
  district_code,
  age,
  height,
  weight,
  country_code,
  price,
  environment_code,
  service_type_code,
  service_mode_code,
  cup_code,
  allow_service,
  page,
  page_range,
}) {
  return axiosProxy({
    url: "/ParadiseApi/Lady_Search",
    method: "post",
    data: {
      site_code: store.state.SiteCode,
      name: name || "",
      town_code: town_code || "",
      district_code: district_code || "",
      age: age || "",
      height: height || "",
      weight: weight || "",
      country_code: country_code || "",
      price: price || "",
      environment_code: environment_code || "",
      service_type_code: service_type_code || "",
      service_mode_code: service_mode_code || "",
      cup_code: cup_code || "",
      allow_service: allow_service || "",
      page: page || 0,
      page_range: page_range || 0,
    }
  })
}
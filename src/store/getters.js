const getters = {
  siteInfo: state => state.siteData.Site || {},
  //siteData
  MarqueeList: state => state.siteData.MarqueeList || [],
  EnvironmentList: state => state.siteData.EnvironmentList || [],
  CupList: state => state.siteData.CupList || [],
  ServiceModeList: state => state.siteData.ServiceModeList || [],
  AllowServiceList: state => state.siteData.AllowServiceList || [],
  //siteInfo
  TownList: state => (state.siteData.Site || {}).TownList || [],
  CountryList: state => (state.siteData.Site || {}).CountryList || [],
  ServiceTypeList: state => (state.siteData.Site || {}).ServiceTypeList || [],

}
export default getters

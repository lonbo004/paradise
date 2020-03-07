const getters = {
  siteInfo: state => state.siteData.Site || {},
  MarqueeList: state => state.siteData.MarqueeList || [],
  TownList: state => (state.siteData.Site || {}).TownList || []
}
export default getters

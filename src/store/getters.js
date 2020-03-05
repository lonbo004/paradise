const getters = {
  siteInfo: state => state.siteData.Site || {},
  MarqueeList: state => state.siteData.MarqueeList || [],
  TownList: state => (state.siteData.Site || {}).TownList || [],
  LeaderBoard_LadyList: state => state.siteData.LeaderBoard_LadyList || [],
}
export default getters

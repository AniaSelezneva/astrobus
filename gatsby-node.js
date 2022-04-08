const path = require(`path`)

// Gather all signs' data and pass it to the page.
exports.createPages = async ({ actions, graphql }) => {
  const allData = {}
  // allData: {aquariusData : {current_date, ... }, piscesData: {current_date, ... }}

  // Get data depending of zodiac sign (lowercase)
  const getData = sign => {
    return graphql(`
    query {
      all${sign.charAt(0).toUpperCase() + sign.slice(1)}Info {
        edges {
          node {
            current_date
            date_range
            description
            compatibility
            mood
            color
            lucky_number
            lucky_time
          }
        }
      }
    }
  `)
  }

  const { data: aquariusData } = await getData("aquarius")
  const { data: piscesData } = await getData("pisces")
  const { data: ariesData } = await getData("aries")
  const { data: taurusData } = await getData("taurus")
  const { data: geminiData } = await getData("gemini")
  const { data: cancerData } = await getData("cancer")
  const { data: leoData } = await getData("leo")
  const { data: virgoData } = await getData("virgo")
  const { data: libraData } = await getData("libra")
  const { data: scorpioData } = await getData("scorpio")
  const { data: sagittariusData } = await getData("sagittarius")
  const { data: capricornData } = await getData("capricorn")

  aquariusData.allAquariusInfo.edges.forEach(edge => {
    if (edge.node.current_date) allData.aquariusData = edge.node
  }) // remove node object with null values from edges array
  allData.piscesData = piscesData.allPiscesInfo.edges[0].node
  allData.ariesData = ariesData.allAriesInfo.edges[0].node
  allData.taurusData = taurusData.allTaurusInfo.edges[0].node
  allData.geminiData = geminiData.allGeminiInfo.edges[0].node
  allData.cancerData = cancerData.allCancerInfo.edges[0].node
  allData.leoData = leoData.allLeoInfo.edges[0].node
  allData.virgoData = virgoData.allVirgoInfo.edges[0].node
  allData.libraData = libraData.allLibraInfo.edges[0].node
  allData.scorpioData = scorpioData.allScorpioInfo.edges[0].node
  allData.sagittariusData = sagittariusData.allSagittariusInfo.edges[0].node
  allData.capricornData = capricornData.allCapricornInfo.edges[0].node

  // ******************

  let weekData = {}

  const getWeekData = () => {
    return graphql(`
      query {
        allWeekInfo {
          edges {
            node {
              header
              text
            }
          }
        }
      }
    `)
  }

  weekData = await getWeekData()

  actions.createPage({
    path: "/week",
    component: path.resolve(`src/templates/week/index.js`),
    context: {
      data: weekData,
    },
  })

  actions.createPage({
    path: "/today",
    component: path.resolve(`src/templates/today/index.js`),
    context: {
      aquariusData: allData.aquariusData,
      piscesData: allData.piscesData,
      ariesData: allData.ariesData,
      taurusData: allData.taurusData,
      geminiData: allData.geminiData,
      cancerData: allData.cancerData,
      leoData: allData.leoData,
      virgoData: allData.virgoData,
      libraData: allData.libraData,
      scorpioData: allData.scorpioData,
      sagittariusData: allData.sagittariusData,
      capricornData: allData.capricornData,
    },
  })
}

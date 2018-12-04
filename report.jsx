var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

const rows = require('./data.json')

const convertToPercentage = (a, b) => {
  const result = parseFloat(((a / b) * 100).toFixed(1))
  return result ? `${result}%` : 'N/A'
}

const dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' },
  { value: 'postal', title: 'Postal' },
  { value: 'uaOS', title: 'OS' },
]

const reduce = function(row, memo) {
  const { type } = row
  switch (type) {
    case 'impression':
      return (memo.impressions = (memo.impressions || 0) + 1)
    case 'display':
      return (memo.displays = (memo.displays || 0) + 1)
    case 'load':
      return (memo.loads = (memo.loads || 0) + 1)
    default:
      return memo
  }
}

const calculations = [
  {
    title: 'Display Rate',
    value: memo => convertToPercentage(memo.displays, memo.loads),
  },
  {
    title: 'Load Rate',
    value: memo => convertToPercentage(memo.loads, memo.impressions),
  },
  { title: 'Impressions', value: 'impressions' },
  { title: 'Displays', value: 'displays' },
  { title: 'Loads', value: 'loads' },
]

module.exports = createReactClass({
  render() {
    return (
      <ReactPivot
        rows={rows}
        activeDimensions={['Date', 'Host']}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
      />
    )
  },
})

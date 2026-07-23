
import { createRoot } from 'react-dom/client'

const element = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <th>John</th>
      </tr>
      <tr>
        <th>Mohit</th>
      </tr>

  </table>
)
createRoot(document.getElementById('root')).render(
 element
)

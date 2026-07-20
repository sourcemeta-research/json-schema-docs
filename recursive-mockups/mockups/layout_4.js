const { buildRows, renderRowsHtml } = require('./shared-renderer');

module.exports = function render(title, desc, schema) {
  const rows = buildRows(schema);
  const tableRowsHtml = renderRowsHtml(rows);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Carbon Borderless</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FFFFFF;
      color: #161616;
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 2rem;
    }

    header { margin-bottom: 2rem; border-bottom: 1px solid #E0E0E0; padding-bottom: 1rem; }
    header h1 { font-size: 1.5rem; font-weight: 300; color: #161616; }
    header .desc { font-size: 0.875rem; color: #525252; margin-top: 0.25rem; }

    .carbon-table-container {
      border: none;
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
    }

    .carbon-toolbar {
      height: 48px;
      background-color: #FFFFFF;
      border-bottom: 1px solid #E0E0E0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
    }
    .search-input {
      border: none;
      background-color: #F4F4F4;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      width: 280px;
      outline: none;
    }
    .search-input:focus { border-bottom: 2px solid #0F62FE; }

    .bx--data-table {
      background-color: #FFFFFF;
      width: 100%;
      border-collapse: collapse;
      background-color: #FFFFFF;
    }
    .bx--data-table th {
      background-color: #FFFFFF;
      border-bottom: 1px solid #F4F4F4;
      padding: 0.85rem 1rem;
      text-align: left;
      font-size: 0.85rem;
      font-weight: 600;
      color: #161616;
    }
    .bx--data-table td {
      padding: 0.85rem 1rem;
      border-bottom: none;
      font-size: 0.85rem;
      vertical-align: top;
    }
    .carbon-row:hover { background-color: #F4F4F4; }

    .carbon-cell-path { font-weight: 600; }

    code { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; background-color: #F4F4F4; padding: 0.15rem 0.35rem; }
    .type-mono { font-family: 'IBM Plex Mono', monospace; color: #0F62FE; font-weight: 600; }

    .req-alert { color: #DA1E28; font-size: 0.75rem; }
    .opt-alert { color: #525252; font-size: 0.75rem; }

    .carbon-constraints { display: flex; flex-direction: column; gap: 0.25rem; }
    .carbon-tag {
      background-color: #E8F0FE;
      border: 1px solid #C2DBFF;
      color: #0F62FE;
      padding: 0.15rem 0.35rem;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.7rem;
      display: inline-block;
    }
    .t-k { color: #525252; }
    .t-v { font-weight: 600; }
  </style>
</head>
<body>

  <header>
    <h1>${title} Specification</h1>
    <p class="desc">${desc}</p>
  </header>

  <div class="carbon-table-container">
    <div class="carbon-toolbar">
      <span style="font-family: monospace; font-size:0.75rem; color:#525252;">Data Grid Spec</span>
    </div>

    <table class="bx--data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Validation Constraints</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
    </table>
  </div>

</body>
</html>`;
};

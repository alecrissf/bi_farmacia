import './index.css';

export function BiApp() {
  return (
    <div className="bi-wrapper">
      <div className="side-bar">
        <div className="info"></div>
        <div className="filter-wrapper">
          <div className="item">
            <span>Categoria</span>
            <select name="categoria-select" id="categoria-select" multiple>
              <option value="aaa">aa</option>
            </select>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="graph-container">
          <h3>Total de Vendas</h3>
          <b>R$ 100 K</b>
        </div>

        <div className="graph-container">
          <h3>Quantidade de Vendas</h3>
          <b>10 K</b>
        </div>

        <div className="graph-container">
          <h3>Total de Vendas por Categoria</h3>
        </div>
      </div>
    </div>
  );
}

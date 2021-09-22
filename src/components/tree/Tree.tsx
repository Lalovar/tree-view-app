import "./Tree.css";

export function Tree() {
  return (
    <div className="tree-container">
      <div className="tree">
        <p>root</p>
        <div>
          <p>ant</p>
        </div>
        <div>
          <p>bear</p>
          <div>
            <p>cat</p>
          </div>
          <div>
            <p>dog</p>
            <div>
              <p>elephant</p>
            </div>
          </div>
        </div>
        <div>
          <p>frog</p>
        </div>
      </div>
    </div>
  );
}

// ページの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {
    drawArrows();
});

// ウィンドウサイズが変更されたら実行
window.addEventListener('resize', () => {
    drawArrows();
});

// 矢印を描画する関数
function drawArrows() {
    // 矢印の描画対象となる要素を取得
    const horizontalLines = document.querySelectorAll('.arrow-line.horizontal');
    const startElement1 = horizontalLines[0]; // 最初の水平線
    const endElement1 = horizontalLines[2];   // 3つ目の水平線
    const startElement2 = horizontalLines[2]; // 3つ目の水平線
    const endElement2 = horizontalLines[1];   // 2つ目の水平線

    // 矢印を描画するSVGコンテナ
    const svgContainer = document.getElementById('arrow-canvas');
    if (!svgContainer || !startElement1 || !endElement1 || !startElement2 || !endElement2) {
        return; // 必要な要素がなければ何もしない
    }

    // 既存の矢印を全てクリア
    svgContainer.innerHTML = '';

    // 親コンテナの位置を取得
    const parentRect = svgContainer.parentElement.getBoundingClientRect();

    // 1本目の矢印を描画（isFirstArrowをtrueとして渡す）
    createArrow(startElement1, endElement1, parentRect, svgContainer, true);

    // 2本目の矢印を描画（isFirstArrowをfalseとして渡す）
    createArrow(startElement2, endElement2, parentRect, svgContainer, false);
}

// 矢印を生成してSVGに追加するヘルパー関数
function createArrow(startEl, endEl, parentRect, svgContainer, isFirstArrow) {
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    let startX, endX;

    // 始点のX座標を決定
    if (isFirstArrow) {
        // 1本目の矢印: 始点を最初の水平線の右端に設定
        startX = startRect.right - parentRect.left + 8;
    } else {
        // 2本目の矢印: 始点を3つ目の水平線の右端に設定
        startX = startRect.right - parentRect.left + 8;
    }

    // 終点のX座標を決定
    // 両方の矢印の終点を、それぞれの水平線の左端に設定
    endX = endRect.left - parentRect.left - 8;

    // Y座標は要素の中心に設定
    const startY = startRect.top + startRect.height / 2 - parentRect.top;
    const endY = endRect.top + endRect.height / 2 - parentRect.top;

    // SVGの<path>要素で線と矢印の先端を一緒に描画
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${startX},${startY} L${endX},${endY}`);
    path.setAttribute('stroke', 'black');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '5,5'); // 破線
    path.setAttribute('fill', 'none');

    // 矢印の先端部分を生成
    const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
    const arrowSize = 8;
    const headPath = `M${endX},${endY} L${endX - arrowSize * Math.cos((angle - 30) * Math.PI / 180)},${endY - arrowSize * Math.sin((angle - 30) * Math.PI / 180)} L${endX - arrowSize * Math.cos((angle + 30) * Math.PI / 180)},${endY - arrowSize * Math.sin((angle + 30) * Math.PI / 180)} Z`;
    arrowHead.setAttribute('d', headPath);
    arrowHead.setAttribute('fill', 'black');
    arrowHead.setAttribute('stroke', 'none');

    // SVGコンテナに追加
    svgContainer.appendChild(path);
    svgContainer.appendChild(arrowHead);
}

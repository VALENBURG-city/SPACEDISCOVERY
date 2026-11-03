document.addEventListener('DOMContentLoaded', () => {
    const CATALOG_SELECTOR = '.GLOBALCATALOG';

    const root = document.querySelector(CATALOG_SELECTOR);
    if (!root) return;

    function setOpen(node, open) {
        node.dataset.open = String(open);

        const btn = node.querySelector(':scope > .CATALOG .showBUTTON');
        if (btn) btn.textContent = open ? '−' : '+';

        if (!open) {
            node.querySelectorAll(':scope > .children > .tree-node').forEach(child => {
                setOpen(child, false);
            });
        }
    }

    function toggle(node) {
        const isOpen = node.dataset.open === 'true';
        setOpen(node, !isOpen);
    }

    function handleClick(e) {
        const catalogRow = e.target.closest('.CATALOG');
        if (!catalogRow) return;

        const node = catalogRow.closest('.tree-node');
        if (!node) return;

        // лист без кнопки — вообще не мешаем, пусть ссылка работает
        const btn = catalogRow.querySelector('.showBUTTON');
        if (!btn) return;

        // клик по ссылке — не перехватываем, пусть идёт переход
        const link = e.target.closest('a');
        if (link) return;

        // всё остальное (кнопка + и пустая область строки) — переключаем
        e.preventDefault();
        toggle(node);
    }

    root.addEventListener('click', handleClick);

    root.querySelectorAll('.tree-node').forEach(node => setOpen(node, false));
});
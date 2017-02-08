/**
 * Codex Editor Anchors module
 *
 * @author Codex Team
 * @version 1.0
 */

let editor = codex.editor;

module.exports = function (anchors) {

    anchors.input       = null;
    anchors.currentNode = null;

    const blockWithAnchorClassName = 'ce-block--anchor';

    anchors.settingsOpened = function (currentBlock) {

        anchors.currentNode = currentBlock;
        anchors.input.value = anchors.currentNode.dataset.anchor || '';

    };

    anchors.anchorChanged = function (e) {

        var newAnchor = e.target.value = anchors.rusToTranslit(e.target.value);

        if (newAnchor.trim() !== '') {

            anchors.currentNode.dataset.anchor = newAnchor;
            anchors.currentNode.classList.add(blockWithAnchorClassName);

        } else {

            delete anchors.currentNode.dataset.anchor;
            anchors.currentNode.classList.remove(blockWithAnchorClassName);

        }

    };

    anchors.keyDownOnAnchorInput = function (e) {

        if (e.keyCode == editor.core.keys.ENTER) {

            e.preventDefault();
            e.stopPropagation();

            e.target.blur();
            editor.toolbar.settings.close();

        }

    };

    anchors.keyUpOnAnchorInput = function (e) {

        if (e.keyCode >= editor.core.keys.LEFT && e.keyCode <= editor.core.keys.DOWN) {

            e.stopPropagation();

        }

    };

    anchors.rusToTranslit = function (string) {

        var ru = [
                'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
                'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
                'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ь', 'Э', 'Ю', 'Я'
            ],
            en = [
                'A', 'B', 'V', 'G', 'D', 'E', 'E', 'Zh', 'Z', 'I', 'Y',
                'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F',
                'H', 'C', 'Ch', 'Sh', 'Sch', '', 'Y', '', 'E', 'Yu', 'Ya'
            ];

        for (var i = 0; i < ru.length; i++) {

            string = string.split(ru[i]).join(en[i]);
            string = string.split(ru[i].toLowerCase()).join(en[i].toLowerCase());

        }

        string = string.replace(/[^0-9a-zA-Z_]+/g, '-');

        return string;

    };

    return anchors;

}({});
"use strict";
module.exports = function(context, options = {}) {
  const { Syntax, getSource, fixer, RuleError, report } = context;
  return {
      // [Syntax.ListItem]は、markdown文書を解析して得られたASTのListItemノードに対して
      // ルールを設定したいときに返却するオブジェクトのプロパティとして定義します。
      [Syntax.Paragraph](node) {
        return new Promise((resolve, reject) => {
          const text = context.getSource(node); // ノードから文字列だけを取り出しています。
          const reportMatches = ({pattern, test, message, indexer, fixer}) => {
            let matches;
            pattern.lastIndex = 0;
            while (matches = pattern.exec(text)) {
                if (!test || test.apply(null, matches)) {
                    const range = [matches.index, matches.index + matches[0].length];
                    const args  = [range].concat(matches);
                    const index = indexer ? indexer.apply(null, args) : matches.index;
                    const fix   = fixer ? fixer.apply(null, args) : null;
                    report(node, new RuleError(message, { index, fix }));
                }
            }
          };

          reportMatches({
            pattern: /[？！](?![ ？！」』】〉》）\)”"’'］\]〕｝\}＞>]|$)/g,
            message: "感嘆符(！)・疑問符(？)の直後にスペースか閉じ括弧が必要です",
            fixer:   (range) => fixer.insertTextAfterRange(range, " "),
          });

          resolve();
      });
    }
  };
};

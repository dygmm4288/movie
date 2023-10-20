// 일단 먼저 저기를 생각해보자 시나리오부터 생각을 한다면
// 유저는 일단 처음에 인풋에다가 복사로 붙여넣든 아니면 처음부터 작성하든
// 처음에 keyup이나 keydown이 일어나면 find로 찾아야 하는가?
// 그ㅌ러게 그냥 그렇게 해서 ㅎfind로 찾는다고 가정을 하자
// 인풋이 달라지면 계속해서 find를 이요해서 찾는걸로
// 근데 그러면 처음부터 찾아야 하는가?
// 어차피 문자열 길이만큼만 찾으면 될 것 같아서 그 방ㄷ법도 나브지는 않은것 같네
// 오키;

// 노드의 구성 요소로 무엇이 필요한가?
// 일단 본인이 무엇을 가지고 있는지 포함하고 있는지를 알고 있어야 하고
// 다음 노드들로 향하는 포인트들을 알고 있어야 하고
// 이 두개의 정보만 있으면 알 수 있을 듯
// 이제 각 노드에 자식들을 추가한다던가
// 각 노드에 접근할 수 잇도록 해야겟네

class Node {
  constructor(value) {
    this._childs = {}; // 다음 노드들에 대한 포인터 역할을 하고
    this._includes = value ? [value] : [];
  }
}
export class Trie {
  constructor() {
    this._root = new Node();
  }
  push(strArray, originalValue = null, node = this._root) {
    // 처음에 아무것도 안넣을때는 root를 기반으로 진행
    // str로하지 않고 arry로 해서 뒤집어서 넣고 그 다음에 저기 하는게 좋을 것 같은데
    if (node === this._root) {
      strArray = strArray.split('').reverse(); // 뒤집어서 놓고
      node._includes.push(originalValue);
    }
    // 여기서는 재귀적으로 처리하는게 좋을 것 같음
    // 언제까지 하냐면 str이 더 이상 없을때까지
    if (!strArray.length) return;

    const first = strArray.pop(); // 가장 먼저 첫번재 요소를 빼고

    if (!node._childs[first]) {
      node._childs[first] = new Node(originalValue);
    } else {
      node._childs[first]._includes.push(originalValue);
    }

    this.push(strArray, originalValue, node._childs[first]);
    return;
  }
  find(str, node = this._root) {
    // str이 주어졌을 때 찾아야 한다.
    if (node === this._root) str = str.split('').reverse();

    if (!str.length) {
      return node._includes;
    }
    const first = str.pop();
    if (!node._childs[first]) return [];

    const result = this.find(str, node._childs[first]);
    return result;
  }
}

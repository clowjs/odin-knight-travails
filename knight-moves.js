function getLegalMovesKnight(x, y) {
  const moves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2]
  ];
  return moves.filter(move => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8);
}

class Vertice {
  constructor(number, x, y) {
    this.number = number;
    this.x = x;
    this.y = y;
  }
}

class KnightGraph {
  constructor() {
    this.vertices = [];
    this.adjacencyMatrix = [];
    this.addVertices();
    this.fillMatrix();
  }

  addVertices() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.vertices.push(new Vertice(i * 8 + j, i, j));
      }
    }
  }

  fillMatrix() {
    for (let i = 0; i < 64; i++) {
      this.adjacencyMatrix[i] = [];
      for (let j = 0; j < 64; j++) {
        this.adjacencyMatrix[i][j] = 0;
      }
    }
    for (let i = 0; i < 64; i++) {
      const legalMoves = getLegalMovesKnight(this.vertices[i].x, this.vertices[i].y);
      for (let j = 0; j < legalMoves.length; j++) {
        const index = legalMoves[j][0] * 8 + legalMoves[j][1];
        this.adjacencyMatrix[i][index] = 1;
      }
    }
  }

  getNeighbors(vertice) {
    const neighbors = [];
    for (let i = 0; i < 64; i++) {
      if (this.adjacencyMatrix[vertice][i] === 1) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }

  shortestPath(start, end) {
    const queue = [start];
    const visited = Array(64).fill(false);
    const previous = Array(64).fill(null);
    visited[start] = true;

    while (queue.length > 0) {
      const current = queue.shift();

      if (current === end) {
        const path = [];
        let j = current;

        while (j !== null) {
          path.push(j);
          j = previous[j];
        }

        return path.reverse();
      }

      const neighbors = this.getNeighbors(current);

      for (let i = 0; i < neighbors.length; i++) {
        if (!visited[neighbors[i]]) {
          visited[neighbors[i]] = true;
          previous[neighbors[i]] = current;
          queue.push(neighbors[i]);
        }
      }
    }
    
    return null;
  }

  knightMoves(start, end) {
    const startVertice = start[0] * 8 + start[1];
    const endVertice = end[0] * 8 + end[1];

    let shortestPath = this.shortestPath(startVertice, endVertice);

    let moves = shortestPath.map(vertice => {
      return [this.vertices[vertice].x, this.vertices[vertice].y];
    });

    console.log(`=> You made it in ${moves.length - 1} ${(moves.length - 1) == 1 ? 'move' : 'moves'}!  Here's your path:`)
    moves.forEach(move => {
      console.log(move);
    });
  }  
}

const knightGraph = new KnightGraph();
knightGraph.knightMoves([1,6],[7,0]);
knightGraph.knightMoves([0,0],[7,7]);
knightGraph.knightMoves([0,0],[1,2]);

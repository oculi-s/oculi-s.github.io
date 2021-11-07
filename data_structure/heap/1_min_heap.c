//https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html
#include <stdio.h>
#define M 100000

int _heap[101], e;

void _swap(int *a, int *b) {
	int t = *a;
	*a = *b, *b = t;
}

void _heap_push(int x) {
	int i = ++e;
	_heap[i] = x;
	while (_heap[i / 2] > _heap[i] && i >= 1)
		_swap(&_heap[i / 2], &_heap[i]), i /= 2;
}

int _heap_pop() {
	int i = 1, m, v = _heap[1];
	_heap[1] = _heap[e], _heap[e] = M, e--;
	m = _heap[i * 2] < _heap[i * 2 + 1] ? i * 2 : i * 2 + 1;
	while (_heap[i] > _heap[m]) {
		_swap(&_heap[i], &_heap[m]), i = m;
		m = _heap[i * 2] < _heap[i * 2 + 1] ? i * 2 : i * 2 + 1;
	}
	return v;
}

void _print_heap() {
	int i;
	printf("%d : ", e);
	for (i = 1; i <= e; i++)
		printf("%d ", _heap[i]);
	printf("\n");
}

int main() {
	int i, j;
	int x[101] = {0,1,4,2,5,7,3,9,8,1};
	for (i = 1; i <= 100; i++)
		_heap[i] = M;
	for (i = 1; i <= 9; i++) {
		_heap_push(x[i]);
		_print_heap();
	}
	for (i = 1; i <= 9; i++) {
		_heap_pop();
		_print_heap();
	}
	return 0;
}
#include <math.h>
#include <iostream>
#include <napi.h>

using namespace std;

class Complex
{
  // a + ib form
  double a;
  double b;

public:
  Complex()
  {
    this->a = 0;
    this->b = 0;
  }
  Complex(double a, double b)
  {
    this->a = a;
    this->b = b;
  }
  void print()
  {
    cout << a << " + i" << b << endl;
  }
  Complex add(Complex num)
  {
    float real = a + num.a;
    float imag = b + num.b;
    return Complex(real, imag);
  }
  Complex square()
  {
    return Complex(a * a - b * b, 2 * a * b);
  }
  float abs()
  {
    return sqrt(a * a + b * b);
  }
};

int mandelBrot(Complex c, int MAX_ITERATION)
{
  Complex z;
  int n = 0;
  while (z.abs() <= 2 && n < MAX_ITERATION)
  {
    z = z.square().add(c);
    n += 1;
  }
  return n;
};

void getImage(int DIM, Napi::Array pixels2D)
{
  // Change this window values to get different patterns
  double RE_START = -1.5;
  double RE_END = 1.5;
  double IM_START = -2.5;
  double IM_END = 0.5;
  double MAX_ITERATION = 100;

  for (double x = 0; x < DIM; x++)
  {
    for (double y = 0; y < DIM; y++)
    {
      double a = IM_START + (y / DIM) * (IM_END - IM_START);
      double b = RE_START + (x / DIM) * (RE_END - RE_START);
      Complex c(a, b);
      int intensity = mandelBrot(c, MAX_ITERATION);
      double intensityNormalized =
          ((MAX_ITERATION - intensity) / MAX_ITERATION) * 255;
      pixels2D[int(x * DIM + y)] = floor(intensityNormalized);
    }
  }
}
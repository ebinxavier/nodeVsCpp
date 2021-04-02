#include <napi.h>
#include "./modules/mandelBrot.cpp"

Napi::Value MandelBrot(const Napi::CallbackInfo &info)
{
    int DIM = info[0].As<Napi::Number>();
    Napi::Array image = Napi::Array::New(info.Env(), DIM * DIM);
    getImage(DIM, image);
    return image;
}

Napi::Value SumOfN(const Napi::CallbackInfo &info)
{
    double LIMIT = info[0].As<Napi::Number>();
    double sum = 0;
    for (double i = 0; i < LIMIT; i++)
        sum += i;
    Napi::Number res = Napi::Number::New(info.Env(), sum);
    return res;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "mandelBrot"),
                Napi::Function::New(env, MandelBrot));
    exports.Set(Napi::String::New(env, "sumOfN"),
                Napi::Function::New(env, SumOfN));
    return exports;
}

NODE_API_MODULE(mandelBrot, Init)
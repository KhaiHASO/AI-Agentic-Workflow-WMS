"use client"

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDemoStore } from '@/store/demo-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Login = () => {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || 'en';
  const login = useDemoStore((state) => state.login);
  const [role, setRole] = useState<string>('Clerk');
  const [email, setEmail] = useState('demo@wms.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: 'usr-1',
      name: `Demo ${role}`,
      email,
      role: role as any,
    });
    router.push(`/${locale}/dashboard`); // use locale from props if available, or static
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-default-50">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">WMS Demo Login</CardTitle>
          <CardDescription>Đăng nhập vào hệ thống WMS Prototype</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò demo</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clerk">Clerk (Nhân viên)</SelectItem>
                  <SelectItem value="Supervisor">Supervisor (Quản lý)</SelectItem>
                  <SelectItem value="Admin">Admin (Quản trị hệ thống)</SelectItem>
                  <SelectItem value="Integration">Integration (Tích hợp)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full mt-6" color="primary">
              Đăng nhập
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

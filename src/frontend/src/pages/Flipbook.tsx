import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddFlipbook,
  useGetFlipbooks,
  useIsAdmin,
} from "../hooks/useQueries";

function FlipbookViewer({ url, name }: { url: string; name: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  // For PDF rendering we use an iframe
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-foreground">{name}</h3>
        <Badge className="bg-gold/20 text-gold border-gold/30">PDF</Badge>
      </div>

      <div
        className="relative bg-amber-50 rounded-xl overflow-hidden shadow-2xl border-2 border-amber-200"
        style={{ minHeight: "500px" }}
        data-ocid="flipbook.canvas_target"
      >
        {/* Book spine effect */}
        <div className="absolute inset-y-0 left-1/2 w-1 bg-amber-300 shadow-inner z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{
              rotateY: direction === "right" ? -90 : 90,
              opacity: 0,
            }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{
              rotateY: direction === "right" ? 90 : -90,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              transformOrigin:
                direction === "right" ? "left center" : "right center",
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            <iframe
              src={`${url}#page=${currentPage}`}
              className="w-full"
              style={{ height: "500px", border: "none" }}
              title={`${name} - Page ${currentPage}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => {
            setDirection("left");
            setCurrentPage((p) => Math.max(1, p - 1));
          }}
          disabled={currentPage <= 1}
          className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
          data-ocid="flipbook.pagination_prev"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Pichla
        </Button>
        <span className="text-muted-foreground text-sm font-medium">
          Page {currentPage}
        </span>
        <Button
          variant="outline"
          onClick={() => {
            setDirection("right");
            setCurrentPage((p) => p + 1);
          }}
          className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
          data-ocid="flipbook.pagination_next"
        >
          Agla <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export default function Flipbook() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bookName, setBookName] = useState("");
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: flipbooks = [], isLoading } = useGetFlipbooks();
  const { data: isAdmin = false } = useIsAdmin();
  const addFlipbook = useAddFlipbook();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setBookName(file.name.replace(".pdf", ""));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !bookName) {
      toast.error("File aur naam dono zaroori hain");
      return;
    }
    try {
      setUploadProgress(10);
      await addFlipbook.mutateAsync({
        name: bookName,
        file: selectedFile,
        pageCount: 1,
      });
      setUploadProgress(100);
      toast.success("Flipbook upload ho gaya!");
      setSelectedFile(null);
      setBookName("");
      setUploadProgress(0);
    } catch {
      toast.error("Upload failed. Dobara koshish karein.");
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-emerald-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('/assets/generated/islamic-pattern-bg.dim_400x400.png')",
            backgroundSize: "200px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
              PDF Viewer
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Flipbook
            </h1>
            <p className="text-white/70 text-lg">
              Hajj aur Umrah ki guide books online padho — page-turn animation
              ke saath
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-16">
        {/* Admin Upload */}
        {isAdmin && (
          <Card className="mb-8 border-2 border-dashed border-gold/40 bg-gold/5">
            <CardContent className="p-8">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-gold" /> PDF Upload (Admin)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="book-name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Kitab ka Naam
                  </label>
                  <input
                    id="book-name"
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="Hajj Guide 2024"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                    data-ocid="flipbook.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pdf-file"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    PDF File
                  </label>
                  <button
                    type="button"
                    className="w-full border-2 border-dashed border-border rounded-lg px-4 py-3 cursor-pointer hover:border-gold/40 transition-colors text-sm text-muted-foreground text-center"
                    onClick={() => fileRef.current?.click()}
                    data-ocid="flipbook.dropzone"
                  >
                    {selectedFile ? selectedFile.name : "PDF file chunein"}
                  </button>
                  <input
                    id="pdf-file"
                    ref={fileRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div
                  className="mb-3 h-2 bg-border rounded-full overflow-hidden"
                  data-ocid="flipbook.loading_state"
                >
                  <div
                    className="h-full bg-gold transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              <Button
                onClick={handleUpload}
                disabled={addFlipbook.isPending}
                className="bg-emerald-dark text-white hover:opacity-90"
                data-ocid="flipbook.upload_button"
              >
                {addFlipbook.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Upload Ho
                    Raha Hai...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" /> Upload Karo
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Books List */}
        {isLoading ? (
          <div className="text-center py-20" data-ocid="flipbook.loading_state">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-emerald-dark" />
            <p className="text-muted-foreground mt-4">
              Kitabein load ho rahi hain...
            </p>
          </div>
        ) : flipbooks.length === 0 ? (
          <div className="text-center py-20" data-ocid="flipbook.empty_state">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              Abhi Koi Kitab Nahi
            </h3>
            <p className="text-muted-foreground">
              {isAdmin
                ? "Upar se PDF upload karein"
                : "Admin jald hi kitabein add karenge"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Book Selector */}
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Uplabdh Kitabein
              </h3>
              <div className="flex flex-wrap gap-3">
                {flipbooks.map((book, i) => (
                  <Button
                    key={book.name}
                    variant={activeBook === i ? "default" : "outline"}
                    onClick={() => setActiveBook(i)}
                    className={
                      activeBook === i
                        ? "bg-emerald-dark text-white"
                        : "border-emerald-dark text-emerald-dark hover:bg-emerald-dark/5"
                    }
                    data-ocid={`flipbook.item.${i + 1}`}
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> {book.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Viewer */}
            {activeBook !== null && flipbooks[activeBook] && (
              <Card>
                <CardContent className="p-6">
                  <FlipbookViewer
                    url={flipbooks[activeBook].url.getDirectURL()}
                    name={flipbooks[activeBook].name}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
